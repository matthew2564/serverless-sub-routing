import { Inject, Service } from 'typedi';
import { EncounterRequest } from '../domain/models/encounter/encounter-search/EncounterRequest';
import { EncounterSearchProvider } from '../providers/EncounterSearchProvider';
import { EncounterSearchResponse } from '../domain/models/response/EncounterSearchResponse';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class EncounterSearchService {
	constructor(@Inject() private encounterSearchProvider: EncounterSearchProvider) {}

	async getSearchEncounter(encounterRequest: EncounterRequest): Promise<EncounterSearchResponse> {
		const encounters = await this.encounterSearchProvider.getEncounters(encounterRequest);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			encounters,
		};
	}
}
