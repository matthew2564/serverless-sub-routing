import { Inject, Service } from 'typedi';
import { EncounterProvider } from '../providers/EncounterProvider';
import { EncounterResponse } from '../domain/models/response/EncounterResponse';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { EncounterDetail } from '../domain/models/encounter/EncounterDetail';
import { EncounterDetailResponse } from '../domain/models/response/EncounterDetailResponse';

@Service()
export class EncounterService {
	constructor(@Inject() private encounterProvider: EncounterProvider) {}

	async search(identifier: string, vin: string | null): Promise<EncounterResponse> {
		const encounters = await this.encounterProvider.getEncounter(identifier, vin);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			encounters,
		};
	}

	async searchByEncounterIdentifier(identifier: string): Promise<EncounterDetailResponse | null> {
		const encounterDetailData1 = await this.encounterProvider.getEncounterByIdentifier(identifier);

		if (encounterDetailData1 === null) {
			return null;
		}

		const encounterDetailList: EncounterDetail[] = [];

		if (encounterDetailData1.towingVehicleEncounterID === null) {
			// this is the top level towing vehicle
			encounterDetailList.push(encounterDetailData1);

			// check to see if vehicle is towing a trailer
			const encounterDetailData2 = await this.encounterProvider.getEncounterTrailer(
				encounterDetailData1.encounterIdentifier
			);

			if (encounterDetailData2 !== null) {
				encounterDetailList.push(encounterDetailData2);

				// check to see if vehicle is towing a second trailer
				const encounterDetailData3 = await this.encounterProvider.getEncounterTrailer(
					encounterDetailData2.encounterIdentifier
				);

				if (encounterDetailData3 !== null) {
					encounterDetailList.push(encounterDetailData3);
				}
			}
		} else {
			// this part of the if statement the reg mark entered has a towing vehicle encounter id, so it has
			// to be a trailer and determines if it is the first trailer
			const encounterDetailData2 = await this.encounterProvider.getEncounterByIdentifier(
				encounterDetailData1.towingVehicleEncounterID
			);

			if (encounterDetailData2?.towingVehicleEncounterID === null) {
				// this is the top level towing vehicle
				encounterDetailList.push(encounterDetailData2);

				// this is the first trailer
				encounterDetailList.push(encounterDetailData1);

				// check to see if the reg mark entered has a second trailer
				const encounterDetailData3 = await this.encounterProvider.getEncounterTrailer(
					encounterDetailData1.encounterIdentifier
				);

				if (encounterDetailData3) {
					encounterDetailList.push(encounterDetailData3);
				}
			} else if (encounterDetailData2 !== null) {
				// this part of the 'if' the reg mark entered has a towing vehicle encounter id and the associated
				// encounter also has a towing vehicle encounter then this must be the second trailer
				const encounterDetailData3 = await this.encounterProvider.getEncounterByIdentifier(
					encounterDetailData2.towingVehicleEncounterID
				);

				// this is the top level towing vehicle
				if (encounterDetailData3 !== null) encounterDetailList.push(encounterDetailData3);

				// this is the first trailer
				encounterDetailList.push(encounterDetailData2);

				// this is the second trailer
				encounterDetailList.push(encounterDetailData1);
			}
		}

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			encounterDetail: encounterDetailList,
		};
	}
}
