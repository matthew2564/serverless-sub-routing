import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { EncounterTrailerCount } from '../domain/models/encounter/encounter-search/EncounterTrailerCount';
import { EncounterSanctionResult } from '../domain/models/encounter/encounter-search/EncounterSanctionResult';
import { EncounterSanction } from '../domain/models/encounter/encounter-search/EncounterSanction';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { EncounterRequest } from '../domain/models/encounter/encounter-search/EncounterRequest';
import { EncounterAssocData } from '../domain/models/encounter/encounter-search/EncounterAssocData';
import { EncounterSearchDriver } from '../domain/models/encounter/encounter-search/EncounterSearchDriver';
import { EncounterEndorsableFlag } from '../domain/models/encounter/encounter-search/EncounterEndorsableFlag';

@Service()
export class EncounterSearchProvider {
	private static readonly OUT_PROHIB = /BMPZ01|BMVZ01|BMFZ01|FMPZ01|BWPZ01|FWPZ01|FOPA01|BOPA01|FOPB01|BOPB01|BDGP01/;

	get session() {
		return Container.get(SESSION);
	}

	async getEncounters(encounterRequest: EncounterRequest) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		// return a list of encounters based on the search parameters in the encounter request object
		const encounterAssocData = await this.session.selectList(
			'getSearchEncounters',
			{ ...encounterRequest },
			EncounterAssocData
		);

		return Promise.all(
			encounterAssocData.map(
				// loop through each encounter to set 3 fields - numberOfTrailers, sanctionCode, outstandingProhibition
				async (encounter) => {
					const [
						encounterTrailerCount,
						encounterSearchDrivers,
						encounterEndorsableFlag,
						immobilisationCount,
						sanction,
					] = await Promise.all([
						// pass in the encounter id to the getTrailerCount method to return the number of
						// trailers for the entire encounter
						this.getTrailerCount(encounter.encounterIdentifier),

						// populate driver name array with list drivers
						this.session.selectAndCatchSilently(
							'getDriverName',
							{ identifier: encounter.encounterIdentifier },
							EncounterSearchDriver
						),

						//populate endorsable flag
						this.session
							.selectAndCatchSilently(
								'getEndorsableFlag',
								{ identifier: encounter.encounterIdentifier },
								EncounterEndorsableFlag
							)
							.then(([encounterEndorsable]) => encounterEndorsable),

						// populate immobilisationFlag
						this.session.selectOne('getImmobilisationCount', { identifier: encounter.encounterIdentifier }, Number),

						// call getEncounterSanction method to set the sanctionCode and outstanding Prohibition fields
						// for a sift, ie inspection level 4 set fields to N
						encounter?.inspectionLevel === 4
							? Promise.resolve(null)
							: this.getEncounterSanction(encounter.encounterIdentifier),
					]);

					encounter.numberOfTrailers = encounterTrailerCount?.trailerCount || 0;
					encounter.driverName = encounterSearchDrivers.length === 0 ? null : encounterSearchDrivers;
					encounter.endorsableFlag = encounterEndorsableFlag?.endorsableFlag || 'N';
					encounter.immobilisationFlag = (immobilisationCount as number) > 0 ? 'Y' : 'N';

					if (encounter?.inspectionLevel === 4) {
						encounter.sanctionCode = 'N';
						encounter.outProhibition = 'N';
					} else {
						encounter.sanctionCode = sanction?.sanctionCode || 'N';
						encounter.outProhibition = sanction?.outProhibition || 'N';
					}

					return encounter;
				}
			)
		);
	}

	async getTrailerCount(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const result = await this.session.selectAndCatchSilently(
			'getTrailerCount',
			{
				identifier: encounterID,
			},
			EncounterTrailerCount
		);

		return result[0];
	}

	async getEncounterSanction(encounterID: string): Promise<EncounterSanctionResult | null> {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		let sanctionCode: string | null;
		let outProhibition: string;

		// get list of notices for all associated vehicles by the encounter id
		const encounterSanctionList = await this.session.selectAndCatchSilently(
			'getSanctionCode',
			{ identifier: encounterID },
			EncounterSanction
		);

		// no notices for the encounter
		if (encounterSanctionList.length === 0) {
			sanctionCode = 'N';
			outProhibition = 'N';

			//more than 1 notice set sanction to X and calculate if there are any outstanding prohibitions
		} else if (encounterSanctionList.length > 1) {
			sanctionCode = 'X';
			outProhibition = this.getOutstandingProhibition(encounterSanctionList);
		} else {
			//based on the type of notice set the sanction code accordingly
			const [firstSanction] = encounterSanctionList;

			switch (firstSanction.fkNtyCode) {
				case 'BMPZ01':
				case 'FMPZ01':
				case 'BMFZ01':
				case 'BMRZ01':
				case 'FMRZ01':
				case 'BMVZ01':
				case 'BMXZ01':
				case 'FMXZ01':
					sanctionCode = 'R';
					break;
				case 'BWPZ01':
				case 'FWPZ01':
				case 'BWRZ01':
				case 'FWRZ01':
					sanctionCode = 'W';
					break;
				case 'BOPA01':
				case 'BOPB01':
				case 'BORZ01':
				case 'FOPA01':
				case 'FOPB01':
				case 'FORZ01':
					sanctionCode = 'O';
					break;
				case 'BDGP01':
					sanctionCode = 'H';
					break;
				case 'BFPN01':
				case 'FFPN01':
				case 'FDEN01':
					sanctionCode = 'F';
					break;
				default:
					sanctionCode = null;
			}

			outProhibition = this.getOutstandingProhibition(encounterSanctionList);
		}

		return {
			outProhibition,
			sanctionCode,
		};
	}

	getOutstandingProhibition(encounterSanctionList: EncounterSanction[]): string {
		let outProhibition: string;
		let outProhibCount = 0;

		//loop through all the notices to see if any are outstanding and if so increase counter
		for (const outStandProhib of encounterSanctionList) {
			if (
				EncounterSearchProvider.OUT_PROHIB.test(outStandProhib.fkNtyCode) &&
				(!outStandProhib.clearanceDate || DateTime.at(outStandProhib.clearanceDate).isAfter(new DateTime())) &&
				outStandProhib.noticeStatus?.toUpperCase() === 'A' &&
				(!outStandProhib.inForceDate || DateTime.at(outStandProhib.inForceDate).isBefore(new DateTime()))
			) {
				outProhibCount++;
			}
		}

		//set outstanding prohibition field to Y if there are any
		if (outProhibCount > 0) {
			outProhibition = 'Y';
		} else {
			outProhibition = 'N';
		}

		return outProhibition;
	}
}
