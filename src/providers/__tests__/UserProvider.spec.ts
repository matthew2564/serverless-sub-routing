import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { UserProvider } from '../UserProvider';
import { User } from '../../models/UserModel';

// Mocking the AWS SDK and credential providers
jest.mock('@aws-sdk/lib-dynamodb', () => ({
	GetCommand: jest.fn(),
	PutCommand: jest.fn(),
}));
jest.mock('@aws-sdk/client-dynamodb', () => {
	const originalModule = jest.requireActual('@aws-sdk/client-dynamodb');
	return {
		...originalModule,
		DynamoDBClient: jest.fn(),
	};
});

describe('UserProvider', () => {
	let userProvider: UserProvider;
	let originalEnvironment = {};
	const mockResponse = { Item: { staffNumber: '123', name: 'John Doe' } };
	const mockSend = jest.fn();

	beforeAll(() => {
		// Mocking DynamoDBClient instance
		(DynamoDBClient as jest.Mock).mockImplementation(() => ({
			send: mockSend,
		}));
	});

	beforeEach(() => {
		originalEnvironment = process.env;
		process.env = { ...originalEnvironment };
		userProvider = new UserProvider();
	});

	afterEach(() => {
		process.env = originalEnvironment;
		jest.clearAllMocks();
	});

	describe('findUserRecord', () => {
		it('should find a user record', async () => {
			// ARRANGE
			mockSend.mockResolvedValueOnce(mockResponse);

			// ACT
			const result = await userProvider.findUserRecord('123');

			// ASSERT
			expect(GetCommand).toHaveBeenCalledWith({
				TableName: process.env.USERS_DDB_TABLE_NAME || 'users',
				Key: { staffNumber: '123' },
			});
			expect(result).toEqual(mockResponse.Item);
		});

		it('should return null if no user record is found', async () => {
			// ARRANGE
			mockSend.mockResolvedValueOnce({});

			// ACT
			const result = await userProvider.findUserRecord('456');

			// ASSERT
			expect(result).toBeNull();
		});
	});

	describe('postUserRecord', () => {
		it('should create a user record with payload and return 200', async () => {
			// ARRANGE
			mockSend.mockResolvedValueOnce({ $metadata: { httpStatusCode: 200 } });

			const user: User = {
				email: 'some.email@some-addr.com',
				staffNumber: '123',
				age: 21,
			};

			// ACT
			const result = await userProvider.postUserRecord(user);

			// ASSERT
			expect(PutCommand).toHaveBeenCalledWith({
				TableName: process.env.USERS_DDB_TABLE_NAME || 'users',
				Item: user,
			});
			expect(result).toEqual(200);
		});
	});
});
