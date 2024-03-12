import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import { UserProvider } from '../../../../src/proxy/providers/UserProvider';
import { User } from '../../../../src/domain/models/UserModel';

jest.mock('@aws-sdk/lib-dynamodb', () => {
	const originalModule = jest.requireActual('@aws-sdk/lib-dynamodb');

	return {
		__esModule: true,
		...originalModule,
		GetCommand: jest.fn(),
		PutCommand: jest.fn(),
	};
});

jest.mock('@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client', () => ({
	DynamoDb: {
		getClient: jest.fn().mockReturnValue({
			send: jest.fn(),
		}),
	},
}));

describe('UserProvider', () => {
	let userProvider: UserProvider;
	const mockTableName = 'users';

	beforeAll(() => {
		process.env.USERS_DDB_TABLE_NAME = mockTableName;
		userProvider = new UserProvider();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('findUserRecord', () => {
		it('should call GetCommand with correct parameters', async () => {
			const staffNumber = '123';
			const mockResponse = { Item: { staffNumber: '123', name: 'John Doe' } };
			(DynamoDb.getClient().send as jest.Mock).mockResolvedValueOnce(mockResponse);

			const result = await userProvider.findUserRecord(staffNumber);

			expect(GetCommand).toHaveBeenCalledWith({
				TableName: mockTableName,
				Key: { staffNumber },
			});
			expect(result).toEqual(mockResponse.Item);
		});
	});

	describe('postUserRecord', () => {
		it('should call PutCommand with correct parameters and return http status code', async () => {
			const mockResponse = { $metadata: { httpStatusCode: 200 } };
			const user: User = {
				email: 'some.email@some-addr.com',
				staffNumber: '123',
				age: 21,
			};
			(DynamoDb.getClient().send as jest.Mock).mockResolvedValueOnce(mockResponse);

			const statusCode = await userProvider.postUserRecord(user);

			expect(PutCommand).toHaveBeenCalledWith({
				TableName: mockTableName,
				Item: user,
			});
			expect(statusCode).toBe(mockResponse.$metadata.httpStatusCode);
		});
	});
});
