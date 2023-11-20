import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export class UserRepository {
    private static opts = { region: 'eu-west-1' } as DynamoDBClientConfig;
    private dynamoClient: DynamoDBClient;

    constructor() {
        this.dynamoClient = this.createDynamoClient();
    }

    private createDynamoClient(): DynamoDBClient {
        return new DynamoDBClient(UserRepository.opts);
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
