import { Container, Service } from 'typedi';
import { OperatorVisitRequest } from '../domain/models/operator/OperatorVisitRequest';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { OperatorVisitData } from '../domain/models/operator/OperatorVisitData';
import { OperatorVisitVehicleEncounter } from '../domain/models/operator/OperatorVisitVehicleEncounter';

@Service()
export class OperatorVisitProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitData[]> {
		return this.session.selectList('getOperatorVisit', { ...operatorVisitRequest }, OperatorVisitData);
	}

	async getOperatorVehicleEncounter(operatorVisit: OperatorVisitData): Promise<OperatorVisitVehicleEncounter[]> {
		if (operatorVisit.generatedNumber !== null) {
			return this.session.selectList(
				'getOperatorVehicleEncounter',
				{ generatedNumber: operatorVisit.generatedNumber },
				OperatorVisitVehicleEncounter
			);
		}
		return [];
	}
}
