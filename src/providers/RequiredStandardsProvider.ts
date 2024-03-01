import { Service } from 'typedi';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { ITaxonomySectionRequiredStandards } from '../domain/models/defects/ITaxonomySectionRequiredStandards';
import { ScanCommandInput } from '@aws-sdk/client-dynamodb';

@Service()
export class RequiredStandardsProvider {
	private static get tableName(): string {
		return EnvironmentVariables.get('REQUIRED_STANDARDS_DDB_TABLE_NAME');
	}

	async findByEUVehicleCategory(euVehicleCategory: string): Promise<ITaxonomySectionRequiredStandards[]> {
		const scanParams: Partial<ScanCommandInput> = {
			TableName: RequiredStandardsProvider.tableName,
			FilterExpression: 'euVehicleCategory = :euVehicleCategory',
			ExpressionAttributeValues: {
				':euVehicleCategory': {
					S: euVehicleCategory,
				},
			},
		};
		return DynamoDb.fullScan<ITaxonomySectionRequiredStandards>(scanParams);
	}
}
