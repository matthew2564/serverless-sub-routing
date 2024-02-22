import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterTrailer {
	@Expose({ name: 'TRAILER_IDENTIFIER' })
	trailerIdentifier!: string;

	@Expose({ name: 'CUSTOM_MAKE' })
	customMake!: string;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'CHASSIS' })
	chassis!: string;

	@Expose({ name: 'MINISTRY_PLATE_NUM' })
	ministryPlate!: string;

	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;
}
