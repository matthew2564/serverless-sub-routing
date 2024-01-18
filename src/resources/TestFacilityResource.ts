import { Inject, Service } from 'typedi';
import { Body, Get, JsonController, NotFoundError, Param, Put, Res } from 'routing-controllers';
import { Response } from 'express';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { name } from '../../package.json';
import { TestFacilityService } from '../services/TestFacilityService';
import { ErrorEnum } from '../enums/Error.enum';
import { ITestStation } from '../models/TestStation.model';
import { ValidateSchema } from '../misc/decorators/JoiDecorator';
import { Schemas } from '../misc/schemas/TestStationSchema';

@Service()
@JsonController('/1.0/test-facility')
export class TestFacilityResource {
	private readonly logger: Logger = new Logger({
		serviceName: name, // @TODO: Can `TestFacilityResource.name` work here? Might need `keepNames` in esbuild.
		logLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
	});

	constructor(@Inject() private testFacilityService: TestFacilityService) {
		this.testFacilityService = testFacilityService;
	}

	@Get('/test-stations')
	async getTestStations(@Res() response: Response) {
		try {
			this.logger.info('Calling `getTestStations`');

			const testStations = await this.testFacilityService.getAllTestStations();

			this.logger.info(`Found ${testStations.length} test stations`);

			return response.status(200).json(testStations);
		} catch (err) {
			this.logger.error('[ERROR]: getTestStations', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(404).send({ message: ErrorEnum.NO_TEST_STATIONS_FOUND });
			}

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/test-stations/:testStationPNumber')
	async getTestStationsEmails(@Param('testStationPNumber') testStationPNumber: number, @Res() response: Response) {
		try {
			this.logger.info(`Calling \`getTestStationsEmails\` with ${testStationPNumber}`);

			const testStationEmails = await this.testFacilityService.getTestStationEmailsByPNumber(
				testStationPNumber.toString()
			);

			this.logger.info(`Found ${testStationEmails.length} test station emails`);

			return response.status(200).json(testStationEmails);
		} catch (err) {
			this.logger.error('[ERROR]: getTestStationsEmails', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(404).send({ message: ErrorEnum.NO_TEST_STATION_EMAILS_FOUND });
			}

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Put('/test-stations')
	@ValidateSchema(Schemas.testStation)
	async updateTestStation(@Body() testStation: ITestStation, @Res() response: Response) {
		try {
			this.logger.info(`Calling \`updateTestStation\` for testStation`, {
				testStation: testStation.testStationId,
				testStationPNumber: testStation.testStationPNumber,
			});

			const testStationId = await this.testFacilityService.updateTestStation(testStation);

			this.logger.info(`Updated test station ${testStationId}`);

			return response.status(202).json({ message: `Test station updated for ${testStationId}` });
		} catch (err) {
			this.logger.error('[ERROR]: updateTestStation', (err as Error).message);

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
