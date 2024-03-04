import { Inject, Service } from 'typedi';
import { Get, JsonController, Res } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Logger } from '@aws-lambda-powertools/logger';
import type { Response } from 'express';
import { VersionService } from '../services/VersionService';
import { LOGGER } from '../domain/di-tokens/Tokens';

@Service()
@JsonController('/1.0/version')
export class VersionResource {
	constructor(
		@Inject() private versionService: VersionService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	@OpenAPI({
		description: 'API for retrieving the version of the service',
		tags: ['version'],
		responses: {
			'200': {
				description: 'OK',
			},
		},
	})
	getVersion(@Res() response: Response) {
		const versionData = this.versionService.getVersion();

		this.logger.debug(`Called \`getVersion\``, { versionData });

		return response.status(200).json(versionData);
	}
}
