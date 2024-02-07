import { JsonController, Get, Res, QueryParams, BadRequestError, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { VehicleService } from '../services/VehicleService';
import { name, version } from '../../package.json';
import { ErrorEnum } from '../enums/Error.enum';
import { VehicleParams } from '../models/VehicleDataModel';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import {LOGGER} from "../repository/di-tokens";

@Service()
@JsonController('/1.0/vehicle')
export class VehicleResource {
	constructor(
		@Inject() private vehicleService: VehicleService,
		@Inject(LOGGER) private logger: Logger,
	) {
		this.vehicleService = vehicleService;
	}

	@Get('/version')
	getVersion(@Res() response: Response) {
		this.logger.debug(`Version v${version}`);

		return response.status(HttpStatus.OK).json({ version });
	}

	@Get('/')
	async getVehicleByVrm(
		@QueryParams({ validate: { stopAtFirstError: true } }) { identifier }: VehicleParams,
		@Res() response: Response
	) {
		try {
			this.logger.info(`Calling \`getVehicleByVrm\` with identifier \`${identifier}\``);

			const vehicle = await this.vehicleService.searchByVrm(identifier);

			this.logger.info(`Vehicle found using \`${identifier}\``);

			const timestamp = new DateTime().format('DD/MM/YYYY HH:mm:ss');

			return response.status(HttpStatus.OK).json({ timestamp, vehicle });
		} catch (err) {
			this.logger.error('[ERROR]: getVehicleByVrm', (err as Error).message);

			if (err instanceof BadRequestError || err instanceof NotFoundError) {
				return response.status(err.httpCode).json({
					message: err.message,
				});
			}

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
