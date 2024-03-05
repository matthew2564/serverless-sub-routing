import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Service } from 'typedi';
import { DynamoDb } from '@dvsa/cvs-microservice-common/classes/aws/dynamo-db-client';
import type { User } from '../domain/models/UserModel';

@Service()
export class UserProvider {
	private static dynamoDBTable = process.env.USERS_DDB_TABLE_NAME || 'users';
	private dynamoClient; // `DynamoDBClient` instance is inferred due to assignment in constructor

	constructor() {
		this.dynamoClient = DynamoDb.getClient({ region: 'eu-west-1' });
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