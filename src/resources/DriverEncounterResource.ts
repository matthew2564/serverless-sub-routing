import { Inject, Service } from 'typedi';
import { Response } from 'express';
import { Body, JsonController, Post, Res } from 'routing-controllers';
import { DriverRequest } from '../domain/models/driver/DriverRequest';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { DriverEncounterService } from '../services/DriverEncounterService';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { obfuscate } from '../domain/helpers/ObfuscateValue';

@Service()
@JsonController('/1.0/driver')
export class DriverEncounterResource {
	constructor(
		@Inject() private driverEncounterService: DriverEncounterService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Post('/encounter')
	async getDriverEncounter(@Body({ validate: true }) driverRequest: DriverRequest, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ licenceNo: obfuscate(driverRequest.licenceNo) });

			this.logger.debug(`Calling \`getDriverEncounter\``);

			const resp = await this.driverEncounterService.getDriverEncounter(driverRequest);

			this.logger.info(`${resp.drivers?.length} driver encounters found.`);

			if (!resp.drivers?.length) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getDriverEncounter', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
