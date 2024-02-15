import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { OperatorVisitService } from '../services/OperatorVisitService';
import { OperatorVisitRequest } from '../domain/models/McModel';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { ValidateJSON } from '../domain/decorators/ValidateJSONDecorator';
import { operatorVisitPayloadValidator } from '../domain/validators/OperatorVisitPayloadValidator';

@Service()
@JsonController('/1.0/operator')
export class OperatorVisitResource {
	constructor(
		@Inject() private operatorVisitService: OperatorVisitService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Post('/visit')
	@ValidateJSON<OperatorVisitRequest>(operatorVisitPayloadValidator)
	async getOperatorVisit(@Body() body: OperatorVisitRequest, @Res() response: Response) {
		try {
			this.logger.debug(`Calling \`getOperatorVisit\``, { body });

			this.logger.addPersistentLogAttributes({
				guid: body.clientGuid,
				operatorLicenceNumber: body.operatorLicenceNumber,
			});

			const operatorVisitResponse = await this.operatorVisitService.getOperatorVisit(body);

			this.logger.info(`${operatorVisitResponse.count} operator visits found.`);

			if (!operatorVisitResponse?.operatorVisitsData.length) {
				return response.status(204).json({});
			}

			return response.status(200).json(operatorVisitResponse);
		} catch (err) {
			this.logger.error('[ERROR]: getOperatorVisit', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
