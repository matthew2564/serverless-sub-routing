import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { fromEnv, fromIni } from '@aws-sdk/credential-providers';

// @TODO: Can this be moved to a common package to standardise and abstract the creation of the client?
export abstract class DynamoDbClient {
	private readonly _dynamoClient: DynamoDBClient;

	protected constructor(private clientOpts: Partial<DynamoDBClientConfig>) {
		this._dynamoClient = this.createDynamoClient();
	}

	get dynamoClient(): DynamoDBClient {
		return this._dynamoClient;
	}

	// This logic we are looking to wrap up in a common package so the setup will be abstracted
	private createDynamoClient(): DynamoDBClient {
		const opts = { ...this.clientOpts };

		// If using `~/.aws/credentials` file
		if (process.env.USE_CREDENTIALS === 'true') {
			opts.credentials = fromIni();

			// If using `serverless-offline`
		} else if (process.env.IS_OFFLINE === 'true') {
			opts.credentials = fromEnv();
			opts.endpoint = process.env.DDB_OFFLINE_ENDPOINT;
		}

		return new DynamoDBClient(opts);
	}
}
