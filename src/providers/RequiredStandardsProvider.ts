import { Service } from 'typedi';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { ITaxonomySectionRequiredStandards } from '../domain/models/defects/ITaxonomySectionRequiredStandards';

@Service()
export class RequiredStandardsProvider {
	private static get tableName(): string {
		return EnvironmentVariables.get('REQUIRED_STANDARDS_DDB_TABLE_NAME');
	}

	async findByEUVehicleCategory(euVehicleCategory: string): Promise<ITaxonomySectionRequiredStandards[]> {
		return DynamoDb.fullScan<ITaxonomySectionRequiredStandards>({
			TableName: RequiredStandardsProvider.tableName,
			FilterExpression: 'euVehicleCategory = :euVehicleCategory',
			ExpressionAttributeValues: {
				':euVehicleCategory': euVehicleCategory,
			},
		});
	}
}
