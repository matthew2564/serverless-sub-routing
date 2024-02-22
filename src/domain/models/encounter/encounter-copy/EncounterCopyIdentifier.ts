import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyIdentifier {
	@Expose({ name: 'ENCOUNTER_ID1' })
	encounterIdentifier1!: string;

	@Expose({ name: 'ENCOUNTER_ID2' })
	encounterIdentifier2!: string;

	@Expose({ name: 'ENCOUNTER_ID3' })
	encounterIdentifier3!: string;
}
