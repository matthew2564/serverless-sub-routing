import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { OperatorVisitService } from '../services/OperatorVisitService';
import { OperatorVisitRequest } from '../domain/models/operator/OperatorVisitRequest';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { ValidateBody } from '../domain/decorators/ValidateBody';
import { operatorVisitPayloadValidator } from '../domain/validators/OperatorVisitPayloadValidator';

@Service()
@JsonController('/2.0/operator')
export class OperatorVisitResource {
	constructor(
		@Inject() private operatorVisitService: OperatorVisitService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Post('/visit')
	@ValidateBody(operatorVisitPayloadValidator)
	async getOperatorVisit(@Body() body: OperatorVisitRequest, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({
				guid: body.clientGuid,
				operatorLicenceNumber: body.operatorLicenceNumber,
			});

			this.logger.debug(`Calling \`getOperatorVisit\``);

			const resp = await this.operatorVisitService.getOperatorVisit(body);

			this.logger.info(`${resp.count} operator visits found.`);

			if (resp?.operatorVisitsData.length === 0) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getOperatorVisit', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
