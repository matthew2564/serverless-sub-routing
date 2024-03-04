import * as AwsDynamoDb from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import * as EnvVars from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { RequiredStandardsProvider } from '../../../src/providers/RequiredStandardsProvider';

jest.mock('@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client');
jest.mock('@dvsa/cvs-microservice-common/classes/misc/env-vars');

describe('RequiredStandardsProvider', () => {
	const mockTableName = 'mockRequiredStandardsTable';
	let requiredStandardsProvider: RequiredStandardsProvider;

	beforeEach(() => {
		// Mock the environment variable for the DynamoDB table name
		EnvVars.EnvironmentVariables.get = jest.fn().mockReturnValue(mockTableName);

		requiredStandardsProvider = new RequiredStandardsProvider();
	});

	describe('findByEUVehicleCategory', () => {
		it('should fetch required standards by EU vehicle category from DynamoDB', async () => {
			// ARRANGE
			const euVehicleCategory = 'M1';
			const mockRequiredStandardsData = [
				{ id: '1', name: 'Standard 1', euVehicleCategory },
				{ id: '2', name: 'Standard 2', euVehicleCategory },
			];

			// Mock the DynamoDb fullScan method to return the mock data
			AwsDynamoDb.DynamoDb.fullScan = jest.fn().mockResolvedValue(mockRequiredStandardsData);

			// ACT
			const requiredStandards = await requiredStandardsProvider.findByEUVehicleCategory(euVehicleCategory);

			// ASSERT
			expect(AwsDynamoDb.DynamoDb.fullScan).toHaveBeenCalledWith({
				TableName: mockTableName,
				FilterExpression: 'euVehicleCategory = :euVehicleCategory',
				ExpressionAttributeValues: {
					':euVehicleCategory': euVehicleCategory,
				},
			});
			expect(requiredStandards).toEqual(mockRequiredStandardsData);
		});
	});
});
