import { Service } from 'typedi';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import { Defect } from '../domain/models/defects/Defect.model';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';

@Service()
export class DefectsProvider {
	private static get tableName(): string {
		return EnvironmentVariables.get('DEFECTS_DDB_TABLE_NAME');
	}

	async getAllDefects(): Promise<Defect[]> {
		return DynamoDb.fullScan<Defect>({ TableName: DefectsProvider.tableName });
	}
}
