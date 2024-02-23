import { EncounterAssocData } from '../encounter/encounter-search/EncounterAssocData';

export class EncounterSearchResponse {
	timeStamp!: string;
	encounters!: EncounterAssocData[];
}
