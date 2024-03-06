import * as AwsDynamoDb from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import * as EnvVars from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { DefectsProvider } from '../../../src/providers/DefectsProvider';

jest.mock('@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client');
jest.mock('@dvsa/cvs-microservice-common/classes/misc/env-vars');

describe('DefectsProvider', () => {
	const mockTableName = 'mockDefectsTable';
	let defectsProvider: DefectsProvider;

	beforeEach(() => {
		// Mock the environment variable for the DynamoDB table name
		EnvVars.EnvironmentVariables.get = jest.fn().mockReturnValue(mockTableName);

		defectsProvider = new DefectsProvider();
	});

	describe('getAllDefects', () => {
		it('should fetch all defects from DynamoDB', async () => {
			// ARRANGE
			const mockDefectsData = [
				{ id: '1', name: 'Defect 1' },
				{ id: '2', name: 'Defect 2' },
			];

			AwsDynamoDb.DynamoDb.fullScan = jest.fn().mockResolvedValue(mockDefectsData);

			// ACT
			const defects = await defectsProvider.getAllDefects();

			// ASSERT
			expect(AwsDynamoDb.DynamoDb.fullScan).toHaveBeenCalledWith({ TableName: mockTableName });
			expect(defects).toEqual(mockDefectsData);
		});
	});
});
