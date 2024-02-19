import { Inject, Service } from 'typedi';
import { Get, JsonController, Param, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { ValidQueryParam } from '../domain/decorators/ValidQueryParam';
import { NotNullQueryParam } from '../domain/decorators/NotNullQueryParam';
import { EncounterService } from '../services/EncounterService';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { OutstandingProhibitionService } from '../services/OutstandingProhibitionService';

@Service()
@JsonController('/1.0/encounter')
export class EncounterResource {
	constructor(
		@Inject() private encounterService: EncounterService,
		@Inject() private outstandingProhibitionService: OutstandingProhibitionService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	async getEncounter(
		@ValidQueryParam('identifier', /^[A-Za-z0-9]*$/) identifier: string,
		@NotNullQueryParam('vin') vin: string,
		@Res() response: Response
	) {
		try {
			this.logger.addPersistentLogAttributes({ identifier, vin });

			this.logger.debug('Calling `search`');

			const resp = await this.encounterService.search(identifier, vin);

			this.logger.info(`${resp.encounters.length} encounters found.`);

			if (!resp?.encounters.length) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getEncounter', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/{encounterid}/details')
	async getEncounterDetails(@Param('encounterid') encounterId: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ encounterId });

			this.logger.debug('Calling `searchByEncounterIdentifier`');

			const resp = await this.encounterService.searchByEncounterIdentifier(encounterId);

			resp
				? this.logger.info(`${resp.encounterDetail?.length} encounter detail objects found.`)
				: this.logger.info('Encounter detail response was null, so no encounter detail objects found.');

			if (!resp) {
				return response.status(204).json({});
			}
			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getEncounterDetails', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Post('/search')
	async getSearchEncounter(@Res() response: Response) {
		try {
		} catch (err) {
			this.logger.error('[ERROR]: getSearchEncounter', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/{encounterid}/copy')
	async getEncounterCopy(@Param('encounterid') encounterId: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ encounterId });
		} catch (err) {
			this.logger.error('[ERROR]: getEncounterCopy', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/{fpnreference}/fixedpenalty')
	async getFixedPenalties(@Param('fpnreference') identifier: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ identifier });
		} catch (err) {
			this.logger.error('[ERROR]: getFixedPenalties', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Post('/originalprohibition')
	async getOriginalProhibitionDateTime(@Res() response: Response) {
		try {
		} catch (err) {
			this.logger.error('[ERROR]: getOriginalProhibitionDateTime', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/outstandingprohibition')
	async getOutstandingProhibitions(@NotNullQueryParam('identifier') identifier: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ identifier });

			this.logger.debug('Calling `getOutstandingProhibitions`');

			const resp = await this.outstandingProhibitionService.getOutstandingProhibitions(identifier);

			this.logger.info(`${resp.outstandingProhibitions.length} outstanding prohibitions found.`);

			if (!resp?.outstandingProhibitions.length) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getOutstandingProhibitions', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}
