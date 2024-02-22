import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyJourneyType {
	@Expose({ name: 'JTY_GEN_NUM' })
	generatedNumber!: string;

	@Expose({ name: 'JTY_RANK' })
	rank!: string;

	@Expose({ name: 'JTY_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'JTY_DELETION_IND' })
	deletionMarker!: string;
}
