import { Inject, Service } from 'typedi';
import { EncounterCopyAxleData } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleData';
import { EncounterCopyProvider } from '../providers/EncounterCopyProvider';
import { FutureAxleWeights } from '../domain/models/encounter/encounter-copy/FutureAxleWeights';
import { EncounterCopyAxles } from '../domain/models/encounter/encounter-copy/EncounterCopyAxles';
import { EncounterCopyResponse } from '../domain/models/response/EncounterCopyResponse';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { EncounterCopyOffenceData } from '../domain/models/encounter/encounter-copy/EncounterCopyOffenceData';

@Service()
export class EncounterCopyService {
	private static readonly VRM_VIN = /[V|C]/;
	private static readonly TRA_TIN = /[D|T]/;

	constructor(@Inject() private encounterCopyProvider: EncounterCopyProvider) {}

	async getCopyEncounter(encounterID: string): Promise<EncounterCopyResponse> {
		const resp: Partial<EncounterCopyResponse> = new EncounterCopyResponse();

		let encounterTwoId: string | null = null;
		let encounterThreeId: string | null = null;

		const encGeneral = await this.encounterCopyProvider.getGeneralDetails(encounterID);

		resp.encounterGeneralDetails = encGeneral;
		resp.operator = await this.encounterCopyProvider.getOperator(encounterID);

		// if encounterID is for a vehicle and not a trailer populate the vehicle section
		if (encGeneral && EncounterCopyService.VRM_VIN.test(encGeneral.vehicleIdentifierType.code)) {
			resp.encounterVehicleDetails = await this.encounterCopyProvider.getVehicle(encounterID);

			const primaryVehicleDefects = await this.encounterCopyProvider.getDefects(encounterID);
			resp.encounterDefectsPrimaryVehicle = primaryVehicleDefects.length > 0 ? primaryVehicleDefects : null;
			resp.encounterDefectSummaryPrimaryVehicle = await this.encounterCopyProvider.getDefectSummary(encounterID);

			// populate trailerOneDetails section - ????
			const encounterTrailerOne = await this.encounterCopyProvider.getTrailerTwo(encGeneral.encounterIdentifier);

			if (encounterTrailerOne) {
				resp.encounterTrailerOneDetails = encounterTrailerOne;

				const trailerOneDefects = await this.encounterCopyProvider.getDefects(encounterTrailerOne.encounterIdentifier);
				resp.encounterDefectsTrailerOne = trailerOneDefects.length > 0 ? trailerOneDefects : null;

				resp.encounterDefectSummaryTrailer1 = await this.encounterCopyProvider.getDefectSummary(
					encounterTrailerOne.encounterIdentifier
				);

				encounterTwoId = encounterTrailerOne.encounterIdentifier;

				const encounterTrailerTwo = await this.encounterCopyProvider.getTrailerTwo(
					encounterTrailerOne.encounterIdentifier
				);
				resp.encounterTrailerTwoDetails = encounterTrailerTwo;

				if (encounterTrailerTwo) {
					const trailerTwoDefects = await this.encounterCopyProvider.getDefects(
						encounterTrailerTwo.encounterIdentifier
					);
					resp.encounterDefectsTrailerTwo = trailerTwoDefects.length > 0 ? trailerTwoDefects : null;

					resp.encounterDefectSummaryTrailer2 = await this.encounterCopyProvider.getDefectSummary(
						encounterTrailerTwo.encounterIdentifier
					);

					encounterThreeId = encounterTrailerTwo.encounterIdentifier;
				}
			}

			const noticeList = await this.encounterCopyProvider.getNotices(encounterID, encounterTwoId, encounterThreeId);
			resp.notices = noticeList.length > 0 ? noticeList : null;

			// @TODO: REFACTOR TO MOVE BULK OFFENCE SETTING LOGIC OUTSIDE OF VEHICLE/TRAILER LOGIC
			//code below loops through all offences and populates driverOne, driverTwo & notDriver offence sections
			const offenceDataList = await this.encounterCopyProvider.getOffences(
				encounterID,
				encounterTwoId,
				encounterThreeId
			);
			if (offenceDataList?.length > 0) {
				const driverOneData: EncounterCopyOffenceData[] = [];
				const driverTwoData: EncounterCopyOffenceData[] = [];
				const noDriverData: EncounterCopyOffenceData[] = [];

				for (const offenceTempList of offenceDataList) {
					if (offenceTempList.driverTypeValue === 'A') {
						driverOneData.push(offenceTempList);
					} else if (offenceTempList.driverTypeValue === 'O') {
						driverTwoData.push(offenceTempList);
					} else {
						noDriverData.push(offenceTempList);
					}
				}

				resp.encounterOffencesDriverOne = driverOneData.length > 0 ? driverOneData : null;
				resp.encounterOffencesDriverTwo = driverTwoData.length > 0 ? driverTwoData : null;
				resp.encounterOffencesNotDriver = noDriverData.length > 0 ? noDriverData : null;
			}
		}

		// if encounterID is for a trailer and not a vehicle populate the trailer section
		if (encGeneral && EncounterCopyService.TRA_TIN.test(encGeneral.vehicleIdentifierType.code)) {
			resp.encounterTrailerOneDetails = await this.encounterCopyProvider.getTrailer(encounterID);

			const noticeList = await this.encounterCopyProvider.getNotices(null, encounterID, null);
			resp.notices = noticeList.length > 0 ? noticeList : null;

			const trailerOneDefects = await this.encounterCopyProvider.getDefects(encounterID);
			resp.encounterDefectsTrailerOne = trailerOneDefects.length > 0 ? trailerOneDefects : null;
			resp.encounterDefectSummaryTrailer1 = await this.encounterCopyProvider.getDefectSummary(encounterID);

			// code below loops through all offences and populates driverOne, driverTwo & notDriver offence sections
			const offenceDataList = await this.encounterCopyProvider.getOffences(null, encounterID, null);
			if (offenceDataList?.length > 0) {
				const driverOneData: EncounterCopyOffenceData[] = [];
				const driverTwoData: EncounterCopyOffenceData[] = [];
				const noDriverData: EncounterCopyOffenceData[] = [];

				for (const offenceTempList of offenceDataList) {
					if (offenceTempList.driverTypeValue === 'A') {
						driverOneData.push(offenceTempList);
					} else if (offenceTempList.driverTypeValue === 'O') {
						driverTwoData.push(offenceTempList);
					} else {
						noDriverData.push(offenceTempList);
					}
				}

				resp.encounterOffencesDriverOne = driverOneData.length > 0 ? driverOneData : null;
				resp.encounterOffencesDriverTwo = driverTwoData.length > 0 ? driverTwoData : null;
				resp.encounterOffencesNotDriver = noDriverData.length > 0 ? noDriverData : null;
			}
		}

		// getDriver method returns a list of drivers. The code below checks the data returned and populates
		// the driverOne and driverTwo sections of the copy response accordingly
		const encounterDrivers = await this.encounterCopyProvider.getDriver(encounterID);
		if (encounterDrivers?.length > 0) {
			resp.encounterDriverOneDetails = encounterDrivers[0];

			if (encounterDrivers.length > 1) {
				resp.encounterDriverTwoDetails = encounterDrivers[1];
			}
		}

		resp.encounterJourney = await this.encounterCopyProvider.getJourney(encounterID);
		resp.dangerousGoods = await this.encounterCopyProvider.getDangerousGoods(encounterID);
		resp.dangerousGoodsQuestions = await this.encounterCopyProvider.getDangerousGoodsQuestions(encounterID);
		resp.encounterAdditionalInformation = await this.encounterCopyProvider.getAdditionalInformation(encounterID);
		resp.roadWorthinessChecklist = await this.encounterCopyProvider.getRoadWorthinessChecklist(encounterID);

		//Code below loops through complete axle list and populates primary vehicle, trailer 1 and trailer 2 axles
		const axleWeights = await this.getAxleWeights(encounterID);
		resp.encounterPrimaryVehicleWeights = axleWeights.encounterPrimaryVehicleWeights;
		resp.encounterTrailerOneWeights = axleWeights.encounterTrailerOneWeights;
		resp.encounterTrailerTwoWeights = axleWeights.encounterTrailerTwoWeights;

		const fixedPenalties = await this.encounterCopyProvider.getFixedPenalties(
			encounterID,
			encounterTwoId,
			encounterThreeId
		);
		resp.fixedPenalty = fixedPenalties.length > 0 ? fixedPenalties : null;

		return {
			...resp,
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
		} as EncounterCopyResponse;
	}

	// async getCopyEncounterParallel(encounterID: string) {
	// 	const resp = {} as Record<string, any>;
	//
	// 	const [
	// 		generalDetails,
	// 		drivers,
	// 		journey,
	// 		dangerousGoods,
	// 		dangerousGoodsQuestions,
	// 		additionalInfo,
	// 		roadWorthinessChecklist,
	// 		axleWeights,
	// 	] = await Promise.all([
	// 		this.encounterCopyProvider.getGeneralDetails(encounterID),
	// 		this.encounterCopyProvider.getDriver(encounterID),
	// 		this.encounterCopyProvider.getJourney(encounterID),
	// 		this.encounterCopyProvider.getDangerousGoods(encounterID),
	// 		this.encounterCopyProvider.getDangerousGoodsQuestions(encounterID),
	// 		this.encounterCopyProvider.getAdditionalInformation(encounterID),
	// 		this.encounterCopyProvider.getRoadWorthinessChecklist(encounterID),
	// 		this.getAxleWeights(encounterID),
	// 	]);
	//
	// 	// if encounterID is for a vehicle and not a trailer populate the vehicle section
	// 	if (generalDetails && EncounterCopyService.VRM_VIN.test(generalDetails.vehicleIdentifierType.code)) {
	// 	}
	//
	// 	// if encounterID is for a trailer and not a vehicle populate the trailer section
	// 	if (generalDetails && EncounterCopyService.TRA_TIN.test(generalDetails.vehicleIdentifierType.code)) {
	// 	}
	// }

	private async getAxleWeights(encounterID: string) {
		const allAxles = await this.encounterCopyProvider.getAxles(encounterID);

		const allUnits = new FutureAxleWeights();
		const vehicleAxles = new EncounterCopyAxles();
		const trailer1Axles = new EncounterCopyAxles();
		const trailer2Axles = new EncounterCopyAxles();

		if (allAxles) {
			//set axle data for vehicle
			vehicleAxles.grossDesignWeight = allAxles.grossDesignWeight1;
			vehicleAxles.grossPermittedWeight = allAxles.grossPermittedWeight1;
			vehicleAxles.grossActualWeight = allAxles.grossActualWeight1;
			vehicleAxles.excessGrossWeight = allAxles.excessGrossWeight1;
			vehicleAxles.excessGrossWeightPercent = allAxles.excessGrossWeightPercent1;
			vehicleAxles.permittedTrainWeight = allAxles.permittedTrainWeight;
			vehicleAxles.actualTrainWeight = allAxles.actualTrainWeight;
			vehicleAxles.excessTrainWeight = allAxles.excessTrainWeight;
			vehicleAxles.excessTrainWeightPerc = allAxles.excessTrainWeightPerc;
			vehicleAxles.weighPadUse = allAxles.weighPadUse;
			vehicleAxles.axleData = this.getAxleData(allAxles.axleData, 'MV');

			//set axle data for trailer 1
			trailer1Axles.grossDesignWeight = allAxles.grossDesignWeight2;
			trailer1Axles.grossPermittedWeight = allAxles.grossPermittedWeight2;
			trailer1Axles.grossActualWeight = allAxles.grossActualWeight2;
			trailer1Axles.excessGrossWeight = allAxles.excessGrossWeight2;
			trailer1Axles.excessGrossWeightPercent = allAxles.excessGrossWeightPercent2;
			trailer1Axles.permittedTrainWeight = allAxles.permittedTrainWeight;
			trailer1Axles.actualTrainWeight = allAxles.actualTrainWeight;
			trailer1Axles.excessTrainWeight = allAxles.excessTrainWeight;
			trailer1Axles.excessTrainWeightPerc = allAxles.excessTrainWeightPerc;
			trailer1Axles.weighPadUse = allAxles.weighPadUse;
			trailer1Axles.axleData = this.getAxleData(allAxles.axleData, 'T1');

			//set axle data for trailer 2
			trailer2Axles.grossDesignWeight = allAxles.grossDesignWeight3;
			trailer2Axles.grossPermittedWeight = allAxles.grossPermittedWeight3;
			trailer2Axles.grossActualWeight = allAxles.grossActualWeight3;
			trailer2Axles.excessGrossWeight = allAxles.excessGrossWeight3;
			trailer2Axles.excessGrossWeightPercent = allAxles.excessGrossWeightPercent3;
			trailer2Axles.permittedTrainWeight = allAxles.permittedTrainWeight;
			trailer2Axles.actualTrainWeight = allAxles.actualTrainWeight;
			trailer2Axles.excessTrainWeight = allAxles.excessTrainWeight;
			trailer2Axles.excessTrainWeightPerc = allAxles.excessTrainWeightPerc;
			trailer2Axles.weighPadUse = allAxles.weighPadUse;
			trailer2Axles.axleData = this.getAxleData(allAxles.axleData, 'T2');

			allUnits.encounterPrimaryVehicleWeights = vehicleAxles.axleData.length > 0 ? vehicleAxles : null;

			allUnits.encounterTrailerOneWeights = trailer1Axles.axleData.length > 0 ? trailer1Axles : null;

			allUnits.encounterTrailerTwoWeights = trailer2Axles.axleData.length > 0 ? trailer2Axles : null;
		} else {
			allUnits.encounterPrimaryVehicleWeights = null;
			allUnits.encounterTrailerOneWeights = null;
			allUnits.encounterTrailerTwoWeights = null;
		}

		return allUnits;
	}

	private getAxleData(allAxleList: EncounterCopyAxleData[], flag: string): EncounterCopyAxleData[] {
		const axleDataList: EncounterCopyAxleData[] = [];

		if (flag === 'MV') {
			for (const vehicleAxleList of allAxleList) {
				if (vehicleAxleList.axleVehicleType.includes('Motor')) {
					axleDataList.push(vehicleAxleList);
				}
			}
		}

		if (flag === 'T1') {
			for (const trailer1AxleList of allAxleList) {
				if (trailer1AxleList.axleVehicleType.includes('1')) {
					axleDataList.push(trailer1AxleList);
				}
			}
		}

		if (flag === 'T2') {
			for (const trailer2AxleList of allAxleList) {
				if (trailer2AxleList.axleVehicleType.includes('2')) {
					axleDataList.push(trailer2AxleList);
				}
			}
		}

		return axleDataList;
	}
}
