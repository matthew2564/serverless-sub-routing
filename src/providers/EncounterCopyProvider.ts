import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { EncounterCopyIdentifier } from '../domain/models/encounter/encounter-copy/EncounterCopyIdentifier';
import { EncounterJourney } from '../domain/models/encounter/encounter-copy/EncounterJourney';
import { EncounterDangerousGoods } from '../domain/models/encounter/encounter-copy/EncounterDangerousGoods';
import { EncounterTrailer } from '../domain/models/encounter/encounter-copy/EncounterTrailer';
import { EncounterDriver } from '../domain/models/encounter/encounter-copy/EncounterDriver';
import { EncounterVehicle } from '../domain/models/encounter/encounter-copy/EncounterVehicle';
import { EncounterGeneralDetails } from '../domain/models/encounter/encounter-copy/EncounterGeneralDetails';
import { EncounterCopyLocation } from '../domain/models/encounter/encounter-copy/EncounterCopyLocation';
import { EncounterStoppingOfficer } from '../domain/models/encounter/encounter-copy/EncounterStoppingOfficer';
import { EncounterCopyAxleUnits } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleUnits';
import { EncounterCopyAxleData } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleData';

@Service()
export class EncounterCopyProvider {
	private static readonly TRAILER_ONE = 'trailerOne';
	private static readonly TRAILER_TWO = 'trailerTwo';

	get session() {
		return Container.get(SESSION);
	}

	async getEncounterIds(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getEncounterIds', { encounterID }, EncounterCopyIdentifier);
	}

	async getGeneralDetails(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms

		const encounterGeneralDetails = await this.session.selectOne(
			'getGeneralDetails',
			{ encounterID },
			EncounterGeneralDetails
		);

		const [location, esoData] = await Promise.all([
			// if csiGeneratedNumber exists, then get the location details
			encounterGeneralDetails?.csiGeneratedNumber
				? this.session.selectOne(
						'getCheckSiteLocation',
						{ csiId: encounterGeneralDetails.csiGeneratedNumber },
						EncounterCopyLocation
				  )
				: Promise.resolve(null),

			this.session.selectOne('getESOData', { encounterID }, EncounterStoppingOfficer),
		]);

		if (encounterGeneralDetails && location) {
			encounterGeneralDetails.encounterLocationObject = location satisfies EncounterCopyLocation;
		}

		if (encounterGeneralDetails && esoData) {
			encounterGeneralDetails.stoppingOfficer = esoData;
		}

		return encounterGeneralDetails;
	}

	async getOperator(encounterID: string) {}

	async getVehicle(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getVehicle', { encounterID }, EncounterVehicle);
	}

	async getDriver(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectList('getDriver', { encounterID }, EncounterDriver);
	}

	async getTrailer(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getTrailer', { encounterID }, EncounterTrailer);
	}

	async getTrailerTwo(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getTrailerTwo', { encounterID }, EncounterTrailer);
	}

	async getJourney(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getJourney', { encounterID }, EncounterJourney);
	}

	async getDangerousGoods(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		return this.session.selectOne('getDangerousGoods', { encounterID }, EncounterDangerousGoods);
	}

	async getDangerousGoodsQuestions(encounterID: string) {}

	async getAdditionalInformation(encounterID: string) {}

	async getAxles(encounterID: string) {
		// @TODO: Role check - getAllowEncounter OR getAllowEms
		const encounterCopyAxleData = await this.session.selectList('getAxles', { encounterID }, EncounterCopyAxleData);
		if (encounterCopyAxleData.length === 0) return null;

		const encounterCopyAxleUnits = await this.session.selectOne(
			'getAxleUnits',
			{ encounterID },
			EncounterCopyAxleUnits
		);
		if (encounterCopyAxleUnits) encounterCopyAxleUnits.axleData = encounterCopyAxleData;

		return encounterCopyAxleUnits;
	}

	async getDefects(encounterID: string) {}

	async getDefectSummary(encounterID: string) {}

	async getNotices(encounterID: string, encounterTwoId: string, encounterThreeId: string) {}

	async getRoadWorthinessChecklist(encounterID: string) {}

	async getFixedPenalties(encounterID: string, encounterTwoId: string, encounterThreeId: string) {}

	async getOffences(encounterID: string, encounterTwoId: string, encounterThreeId: string) {}
}
