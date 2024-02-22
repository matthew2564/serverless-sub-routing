import { Inject, Service } from 'typedi';
import { EncounterCopyAxleData } from '../domain/models/encounter/encounter-copy/EncounterCopyAxleData';
import { EncounterCopyProvider } from '../providers/EncounterCopyProvider';
import { FutureAxleWeights } from '../domain/models/encounter/encounter-copy/FutureAxleWeights';
import { EncounterCopyAxles } from '../domain/models/encounter/encounter-copy/EncounterCopyAxles';

@Service()
export class EncounterCopyService {
	constructor(@Inject() private encounterCopyProvider: EncounterCopyProvider) {}

	async getCopyEncounter(encounterID: string) {
		const axleWeights = await this.getAxleWeights(encounterID);
	}

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
