import { Expose } from 'class-transformer';

export class ObservedDriverData {
	@Expose({ name: 'FORENAME' })
	forename!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Expose({ name: 'DATE_OF_BIRTH' })
	dateOfBirth!: string;

	@Expose({ name: 'ADDR_1' })
	address!: string;

	@Expose({ name: 'DRIVER_LIC_NUM' })
	licenceNo!: string;

	@Expose({ name: 'DOB_FLAG' })
	dobFlag!: string;

	@Expose({ name: 'LATEST_ENCOUNTER_DATE' })
	latestEncounterDate?: string;
}
