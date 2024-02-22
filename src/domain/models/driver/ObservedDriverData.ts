import { Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

export class ObservedDriverData {
	@Expose({ name: 'FORENAME' })
	forename!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'DATE_OF_BIRTH' })
	dateOfBirth!: string;

	@Expose({ name: 'ADDR_1' })
	address!: string;

	@Expose({ name: 'DRIVER_LIC_NUM' })
	licenceNo!: string;

	@Expose({ name: 'DOB_FLAG' })
	dobFlag!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'LATEST_ENCOUNTER_DATE' })
	latestEncounterDate?: string;
}
