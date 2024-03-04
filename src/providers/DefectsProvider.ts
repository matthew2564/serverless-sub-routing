import { Service } from 'typedi';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { DefectSchemaWithId } from '../domain/models/defects/Defect.model';

@Service()
export class DefectsProvider {
	private static get tableName(): string {
		return EnvironmentVariables.get('DEFECTS_DDB_TABLE_NAME');
	}

	async getAllDefects(): Promise<DefectSchemaWithId[]> {
		return DynamoDb.fullScan<DefectSchemaWithId>({ TableName: DefectsProvider.tableName });
	}
}
