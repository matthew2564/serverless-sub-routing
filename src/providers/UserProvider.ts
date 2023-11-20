import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';
import { Service } from 'typedi';

@Service()
export class UserProvider {
	private static opts = { region: 'eu-west-1' } as DynamoDBClientConfig;
	private dynamoClient: DynamoDBClient;

	constructor() {
		this.dynamoClient = this.createDynamoClient();
	}

	private createDynamoClient(): DynamoDBClient {
		const opts = { ...UserProvider.opts };

		// If using `~/.aws/credentials` file
		if (process.env.USE_CREDENTIALS === 'true') {
			opts.credentials = fromIni();

			// If using serverless-offline
		} else if (process.env.IS_OFFLINE === 'true') {
			opts.credentials = fromEnv();
			opts.endpoint = process.env.DDB_OFFLINE_ENDPOINT;
		}

		return new DynamoDBClient(opts);
	}

	private get dynamoDBTable(): string {
		return process.env.USERS_DDB_TABLE_NAME || 'users';
	}

	async findUserRecord(staffNumber: string) {
		const response = await this.dynamoClient.send(
			new GetCommand({
				TableName: this.dynamoDBTable,
				Key: { staffNumber },
			})
		);

		return response.Item || null;
	}
}
