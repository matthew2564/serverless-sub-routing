import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { Service } from 'typedi';
import { User } from '../models/UserModel';
import { DynamoDbClient } from '../classes/DynamoDbClient';

@Service()
export class UserProvider extends DynamoDbClient {
	private static opts = { region: 'eu-west-1' } as DynamoDBClientConfig;
	private static dynamoDBTable: string = process.env.USERS_DDB_TABLE_NAME || 'users';

	constructor() {
		super(UserProvider.opts);
	}

	async findUserRecord(staffNumber: string) {
		const response = await this.dynamoClient.send(
			new GetCommand({
				TableName: UserProvider.dynamoDBTable,
				Key: { staffNumber },
			})
		);

		return response.Item || null;
	}

	async postUserRecord(user: User) {
		const response = await this.dynamoClient.send(
			new PutCommand({
				TableName: UserProvider.dynamoDBTable,
				Item: user,
			})
		);

		return response?.$metadata.httpStatusCode;
	}
}
