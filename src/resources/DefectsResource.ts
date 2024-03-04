import { Inject, Service } from 'typedi';
import { BadRequestError, Get, JsonController, NotFoundError, Res } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Response } from 'express';
import { Logger } from '@aws-lambda-powertools/logger';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { LOGGER } from '../domain/di-tokens/Tokens';
import { DefectsService } from '../services/DefectsService';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { RequiredStandardsService } from '../services/RequiredStandardsService';
import { NotNullQueryParam } from '../domain/decorators/NotNullQueryParam';
import { OpenAPISpecResponses } from '../../documentation/spec/responses/responses';
import { OpenAPISpecServers } from '../../documentation/spec/servers/servers';
import { OpenAPISpecParams } from '../../documentation/spec/parameters/parameters';

@Service()
@JsonController('/1.0/defects')
export class DefectsResource {
	constructor(
		@Inject() private defectsService: DefectsService,
		@Inject() private requiredStandardsService: RequiredStandardsService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	@OpenAPI({
		description: 'API for retrieving a list of defect reference data',
		tags: ['Defects'],
		servers: OpenAPISpecServers.SERVERS,
		responses: {
			'200': OpenAPISpecResponses.OK('DefectDetails'),
			'500': OpenAPISpecResponses.INTERNAL_SERVER_ERROR,
		},
	})
	async getDefects(@Res() response: Response) {
		try {
			this.logger.debug(`Calling \`getDefectList\``);

			const resp = await this.defectsService.getDefectList();

			this.logger.info(`${resp.length} defects found`);

			return response.status(HttpStatus.OK).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getDefects', { err });

			if (err instanceof NotFoundError) {
				return response.status(HttpStatus.NOT_FOUND).send({ message: ErrorEnum.DEFECTS_NOT_FOUND });
			}
			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/required-standards')
	@OpenAPI({
		description: 'API for retrieving a list of required standards',
		tags: ['Defects'],
		parameters: OpenAPISpecParams.PARAMS.RequiredStandards,
		servers: OpenAPISpecServers.SERVERS,
		responses: {
			'200': OpenAPISpecResponses.OK('RequiredStandards'),
			'500': OpenAPISpecResponses.INTERNAL_SERVER_ERROR,
		},
	})
	async getRequiredStandards(
		@NotNullQueryParam('euVehicleCategory') euVehicleCategory: string,
		@Res() response: Response
	) {
		try {
			this.logger.addPersistentLogAttributes({ euVehicleCategory });

			this.logger.debug(`Calling \`getByEUVehicleCategory\``);

			const resp = await this.requiredStandardsService.getByEUVehicleCategory(euVehicleCategory);

			this.logger.info(`Required standards found`, {
				basic: resp?.basic.length,
				normal: resp?.normal.length,
			});

			return response.status(HttpStatus.OK).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getRequiredStandards', { err });

			if (err instanceof BadRequestError) {
				return response.status(HttpStatus.BAD_REQUEST).send({
					message: ErrorEnum.VALIDATION,
					detail: err.message,
				});
			}
			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
