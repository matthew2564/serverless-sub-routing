import { Service } from 'typedi';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { TEST_STATION_STATUS } from '../enums/TestStation.enum';
import { ITestStation } from '../models/TestStation.model';
import { DynamoDbClient } from '../classes/DynamoDbClient';

@Service()
export class TestFacilityProvider extends DynamoDbClient {
	private static opts = { region: 'eu-west-1' } as DynamoDBClientConfig;
	private static dynamoDBTable: string = process.env.TEST_STATIONS_DDB_TABLE_NAME || 'test-stations';

	constructor() {
		super(TestFacilityProvider.opts);
	}

	async findAllTestStations() {
		const response = await this.dynamoClient.send(
			new ScanCommand({
				TableName: TestFacilityProvider.dynamoDBTable,
				FilterExpression: '#testStationStatus IN(:activeStatus, :terminationReqStatus) ',
				ExpressionAttributeNames: {
					'#testStationStatus': 'testStationStatus',
				},
				ExpressionAttributeValues: {
					':activeStatus': TEST_STATION_STATUS.ACTIVE,
					':terminationReqStatus': TEST_STATION_STATUS.TERMINATION_REQUESTED,
				},
			})
		);

		return response.Items;
	}

	async findTestStationEmailsByPNumber(testStationPNumber: string) {
		const response = await this.dynamoClient.send(
			new QueryCommand({
				TableName: TestFacilityProvider.dynamoDBTable,
				IndexName: 'testStationPNumberIndex',
				KeyConditionExpression: '#testStationPNumber = :testStationPNumber',
				ExpressionAttributeNames: { '#testStationPNumber': 'testStationPNumber' },
				ExpressionAttributeValues: { ':testStationPNumber': testStationPNumber },
			})
		);

		return response.Items;
	}

	async putTestStation(testStation: ITestStation, testStationId: string) {
		const response = await this.dynamoClient.send(
			new PutCommand({
				TableName: TestFacilityProvider.dynamoDBTable,
				Item: {
					...testStation,
					testStationId,
				} as ITestStation,
			})
		);

		return response.$metadata.httpStatusCode;

		// @TODO: CVS seems to think there is a property called `UnprocessedItems` on the putResponse but the docs
		// do not support that and neither do the TS bindings. Need to investigate further.
		// Could the `BatchWrite` be used which does contain `UnprocessedItems`? e.g.
		// const batchWriteResponse = await this.dynamoClient.send(
		// new BatchWriteItemCommand({
		// 	RequestItems: {
		// 		[TestFacilityProvider.dynamoDBTable]: [
		// 			{
		// 				PutRequest: {
		// 					Item: marshall({
		// 						...testStation,
		// 						testStationId: response[0].testStationId ?? testStation.testStationId,
		// 					})
		// 				} as PutRequest,
		// 			},
		// 		] as WriteRequest[],
		// 	},
		// })
		// )
	}
}
