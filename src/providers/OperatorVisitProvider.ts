import { Inject, Service } from 'typedi';
import * as path from 'path';
import MyBatis, { Format, Params } from 'mybatis-mapper';
import { Connection, RowDataPacket } from 'mysql2';
import { Logger } from '@aws-lambda-powertools/logger';
import { OperatorVisitRequest } from '../domain/models/McModel';
import { CONNECTION, LOGGER } from '../domain/di-tokens/di-tokens';
import { plainToInstance } from 'class-transformer';
import { OperatorVisitMap } from '../domain/models/OperatorVistitMapModel';
import { OperatorVehicleEncounterMap } from '../domain/models/OperatorVehicleEncounterMapModel';

@Service()
export class OperatorVisitProvider {
	private static readonly namespace = 'dvsa.mc';

	constructor(
		@Inject(CONNECTION) private connection: Connection,
		@Inject(LOGGER) private logger: Logger
	) {}

	async getOperatorVisit(operatorVisitRequest: OperatorVisitRequest): Promise<OperatorVisitMap[]> {
		MyBatis.createMapper([path.resolve(__dirname, './mappers/OperatorVisitMapper.xml')]);

		const [rows] = await this.connection
			.promise()
			.query(this.constructQuery('getOperatorVisit', { ...operatorVisitRequest }));

		return (rows as RowDataPacket[]).map((row) => plainToInstance(OperatorVisitMap, row));
	}

	async getOperatorVehicleEncounter(operatorVisit: OperatorVisitMap): Promise<OperatorVehicleEncounterMap[]> {
		if (operatorVisit.generatedNumber !== null) {
			MyBatis.createMapper([path.resolve(__dirname, './mappers/OperatorVisitMapper.xml')]);

			const params = { generatedNumber: operatorVisit.generatedNumber };

			const [rows] = await this.connection
				.promise()
				.query(this.constructQuery('getOperatorVehicleEncounter', { ...params }));

			return (rows as RowDataPacket[]).map((row) => plainToInstance(OperatorVehicleEncounterMap, row));
		}

		this.logger.warn('`getOperatorVehicleEncounter` called with a null `generatedNumber`.', {
			operatorVisitID: operatorVisit.clientGuid,
		});
		return [];
	}

	private constructQuery(queryID: string, params: Params): string {
		return MyBatis.getStatement(OperatorVisitProvider.namespace, queryID, params, {
			language: 'sql',
			indent: '  ',
		} satisfies Format);
	}
}
