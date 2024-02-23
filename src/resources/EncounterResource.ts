import { Inject, Service } from 'typedi';
import { Body, Get, JsonController, Param, Post, QueryParam, Res } from 'routing-controllers';
import { Response } from 'express';
import { LOGGER } from '../domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { ValidQueryParam } from '../domain/decorators/ValidQueryParam';
import { NotNullQueryParam } from '../domain/decorators/NotNullQueryParam';
import { EncounterService } from '../services/EncounterService';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { OutstandingProhibitionService } from '../services/OutstandingProhibitionService';
import { FixedPenaltyService } from '../services/FixedPenaltyService';
import { originalProhibitionPayloadValidator } from '../domain/validators/OriginalProhibitionPayloadValidator';
import { ValidateBody } from '../domain/decorators/ValidateBody';
import { OriginalProhibitionRequest } from '../domain/models/prohibition/OriginalProhibitionRequest';
import { OriginalProhibitionService } from '../services/OriginalProhibitionService';
import { EncounterRequest } from '../domain/models/encounter/encounter-search/EncounterRequest';
import { EncounterSearchService } from '../services/EncounterSearchService';
import { isNil, omitBy } from 'lodash';
import { EncounterCopyService } from '../services/EncounterCopyService';

@Service()
@JsonController('/2.0/encounter')
export class EncounterResource {
	constructor(
		@Inject() private encounterService: EncounterService,
		@Inject() private outstandingProhibitionService: OutstandingProhibitionService,
		@Inject() private fixedPenaltyService: FixedPenaltyService,
		@Inject() private originalProhibitionService: OriginalProhibitionService,
		@Inject() private encounterSearchService: EncounterSearchService,
		@Inject() private encounterCopyService: EncounterCopyService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('')
	async getEncounter(
		@ValidQueryParam('identifier', /^[A-Za-z0-9]*$/) identifier: string,
		@QueryParam('vin') vin: string,
		@Res() response: Response
	) {
		try {
			this.logger.addPersistentLogAttributes({ identifier, vin });

			this.logger.debug('Calling `search`');

			const resp = await this.encounterService.search(identifier, vin || null);

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

	@Get('/:encounterid/detail')
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
	async getSearchEncounter(@Body({ validate: true }) body: EncounterRequest, @Res() response: Response) {
		try {
			// strip the nullish values from the log attributes using `omitBy` & `isNil` from `lodash`
			this.logger.addPersistentLogAttributes({ body: omitBy(body, isNil) });

			this.logger.debug('Calling `getSearchEncounter`');

			const resp = await this.encounterSearchService.getSearchEncounter(body);

			this.logger.info(`${resp.encounters.length} encounters found.`);

			if (resp.encounters?.length === 0) {
				return response.status(204).json({});
			}
			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getSearchEncounter', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/:encounterid/copy')
	async getEncounterCopy(@Param('encounterid') encounterId: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ encounterId });

			this.logger.debug('Calling `getCopyEncounter`');

			const encounter = await this.encounterCopyService.getCopyEncounter(encounterId);

			if (!encounter) {
				return response.status(204).json({});
			}

			return response.status(200).json(encounter);
		} catch (err) {
			this.logger.error('[ERROR]: getEncounterCopy', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Get('/:fpnreference/fixedpenalty')
	async getFixedPenalties(@Param('fpnreference') identifier: string, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ identifier });

			this.logger.debug('Calling `search`');

			const resp = await this.fixedPenaltyService.search(identifier);

			this.logger.info(`${resp?.fixedPenaltyDetails.length} fixed pen objects found.`);

			if (resp?.fixedPenaltyDetails.length === 0) {
				return response.status(204).json({});
			}

			return response.status(200).json(resp);
		} catch (err) {
			this.logger.error('[ERROR]: getFixedPenalties', { err });

			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Post('/originalprohibition')
	@ValidateBody(originalProhibitionPayloadValidator)
	async getOriginalProhibitionDateTime(@Body() body: OriginalProhibitionRequest, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ body });

			this.logger.debug('Calling `processRequest`');

			const resp = await this.originalProhibitionService.processRequest(body);

			this.logger.info(`Original prohibition response ${!!resp ? 'found' : 'not found'}.`);

			if (!resp) {
				return response.status(204).json({});
			}
			return response.status(200).json(resp);
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
