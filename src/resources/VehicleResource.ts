import { JsonController, Get, Res, QueryParams } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { VehicleService } from '../services/VehicleService';
import { version } from '../../package.json';
import { ErrorEnum } from '../enums/Error.enum';
import { VehicleParams } from '../models/VehicleDataModel';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { LOGGER } from '../repository/di-tokens';
import { CustomError } from '../models/CustomErrorModel';

@Service()
@JsonController('/1.0/vehicle')
export class VehicleResource {
	constructor(
		@Inject() private vehicleService: VehicleService,
		@Inject(LOGGER) private logger: Logger
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
		// validate the query parameter, using the `VehicleParams` class
		@QueryParams({ validate: { stopAtFirstError: true } }) { identifier }: VehicleParams,
		@Res() response: Response
	) {
		try {
			this.logger.addPersistentLogAttributes({ identifier });

			this.logger.info(`Calling \`getVehicleByVrm\``);

			const vehicle = await this.vehicleService.searchByVrm(identifier);

			this.logger.info(`Vehicle found`);

			const timestamp = new DateTime().format('DD/MM/YYYY HH:mm:ss');

			return response.status(HttpStatus.OK).json({ timestamp, vehicle });
		} catch (err) {
			if (err instanceof CustomError) {
				this.logger.error('[ERROR]: getVehicleByVrm - CustomError', {
					...CustomError.error,
				});

				return response.status(CustomError.error.status).json({
					message: CustomError.error.title,
					detail: CustomError.error.detail,
				});
			}

			this.logger.error('[ERROR]: getVehicleByVrm - CustomError', err as Error);

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
