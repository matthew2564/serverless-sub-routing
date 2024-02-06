import { Service } from 'typedi';
import {OperatorVisitData, OperatorVisitVehicleEncounter} from "../models/OperatorVisitDataModel";
import {OperatorVisitRequest} from "../models/McModel";

@Service()
export class OperatorVisitProvider {
	constructor() {}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitData[]> {
		return [];
	}

	async getOperatorVehicleEncounter(operatorVisitsData: OperatorVisitData): Promise<OperatorVisitVehicleEncounter[]> {
		if (operatorVisitsData.generatedNumber !== null) {
			// do something here
			return [];
		}
		return [];
	}
}
