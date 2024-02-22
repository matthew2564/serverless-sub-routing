import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterStoppingOfficer {
	@Expose({ name: 'USER_ID' })
	userId!: string;

	@Expose({ name: 'FIRST_NAME' })
	firstName!: string;

	@Expose({ name: 'LAST_NAME' })
	surname!: string;

	@Expose({ name: 'EXAMINER_TYPE' })
	examinerType!: string;
}
