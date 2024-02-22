import { Inject, Service } from 'typedi';
import { Get, JsonController, Res } from 'routing-controllers';
import { VersionService } from '../services/VersionService';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { Response } from 'express';

@Service()
@JsonController('/2.0/version')
export class VersionResource {
	constructor(
		@Inject() private versionService: VersionService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	getVersion(@Res() response: Response) {
		const versionData = this.versionService.getVersion();

		this.logger.debug(`Called \`getVersion\``, { versionData });

		return response.status(200).json(versionData);
	}
}
