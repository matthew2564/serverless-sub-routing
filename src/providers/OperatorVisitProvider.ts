import { Inject, Service } from 'typedi';
import * as path from 'path';
import { Connection } from 'mysql2';
import { OperatorVisitRequest } from '../domain/models/operator/OperatorVisitRequest';
import { CONNECTION } from '../domain/di-tokens/di-tokens';
import { OperatorVisitData } from '../domain/models/operator/OperatorVisitData';
import { OperatorVisitVehicleEncounter } from '../domain/models/operator/OperatorVisitVehicleEncounter';
import { QueryProvider } from './QueryProvider';

@Service()
export class OperatorVisitProvider extends QueryProvider {
	private static readonly MAPPER_PATHS = [path.resolve(__dirname, './mappers/OperatorVisitMapper.xml')];

	constructor(@Inject(CONNECTION) connection: Connection) {
		super(connection, OperatorVisitProvider.MAPPER_PATHS);
	}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitData[]> {
		return this.queryAndMapTo('getOperatorVisit', { ...operatorVisitRequest }, OperatorVisitData);
	}

	async getOperatorVehicleEncounter(operatorVisit: OperatorVisitData): Promise<OperatorVisitVehicleEncounter[]> {
		if (operatorVisit.generatedNumber !== null) {
			return this.queryAndMapTo(
				'getOperatorVehicleEncounter',
				{ generatedNumber: operatorVisit.generatedNumber },
				OperatorVisitVehicleEncounter
			);
		}
		return [];
	}
}
