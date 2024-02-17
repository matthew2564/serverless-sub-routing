import { Inject, Service } from 'typedi';
import { Body, JsonController, Post, Res } from 'routing-controllers';
import { Logger } from '@aws-lambda-powertools/logger';
import { Response } from 'express';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { OperatorScoreRequest } from '../domain/models/operator/OperatorScoreRequest';
import { ValidateBody } from '../domain/decorators/ValidateBodyDecorator';
import { operatorScoresPayloadValidator } from '../domain/validators/OperatorScoresPayloadValidator';
import { OperatorScoreService } from '../services/OperatorScoreService';

@Service()
@JsonController('/1.0/operator/scores')
export class AuditResource {
	constructor(
		@Inject() private operatorScoreService: OperatorScoreService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Post('')
	@ValidateBody(operatorScoresPayloadValidator)
	async getOperatorScore(@Body() operatorScoreRequest: OperatorScoreRequest, @Res() response: Response) {
		try {
			this.logger.debug(`Calling \`getOperatorScore\``);

			const resp = await this.operatorScoreService.getOperatorScore(operatorScoreRequest);

			this.logger.info(`${resp.count} operator score objects found.`);

			if (!resp?.count) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getOperatorScore', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
