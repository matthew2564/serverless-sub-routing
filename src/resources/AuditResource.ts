import { Inject, Service } from 'typedi';
import { Get, JsonController, Res } from 'routing-controllers';
import { Logger } from '@aws-lambda-powertools/logger';
import { Response } from 'express';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { AuditHistoryService } from '../services/AuditHistoryService';
import { NotNullQueryParam } from '../domain/decorators/NotNullQueryParam';
import { ErrorEnum } from '../domain/enums/Error.enum';

@Service()
@JsonController('/2.0/audithistory')
export class AuditResource {
	constructor(
		@Inject() private auditHistoryService: AuditHistoryService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	async getAuditHistory(@NotNullQueryParam('identifier') identifier: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ identifier });

			this.logger.debug(`Calling \`getAuditHistory\``);

			const resp = await this.auditHistoryService.getAuditHistory(identifier);

			this.logger.info(`${resp.auditHistory?.length} audit history objects found.`);

			if (resp?.auditHistory.length === 0) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getAuditHistory', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}