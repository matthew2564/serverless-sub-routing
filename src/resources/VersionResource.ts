import { Inject, Service } from 'typedi';
import { Get, JsonController, Res } from 'routing-controllers';
import { VersionService } from '../services/VersionService';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { Response } from 'express';

@Service()
@JsonController('/1.0/version')
export class VersionResource {
	constructor(
		@Inject() private versionService: VersionService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	getVersion(@Res() response: Response) {
		const resp = this.versionService.getVersion();

		this.logger.debug(`Calling \`getVersion\``, { versionData: resp });

		return response.status(200).json(resp);
	}
}
