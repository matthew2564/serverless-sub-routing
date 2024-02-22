import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterDriver {
	@Expose({ name: 'DRIVER_TYPE' })
	source!: string;

	@Expose({ name: 'FORENAME' })
	forename!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Expose({ name: 'DATE_OF_BIRTH' })
	dateOfBirth!: string;

	@Expose({ name: 'BIRTH_PLACE' })
	birthPlace!: string;

	@Expose({ name: 'DRIVER_LIC_NUM' })
	licenceNo!: string;

	@Expose({ name: 'REG_KEEPER_INDICTR' })
	isKeeper!: string;

	@Expose({ name: 'SEX' })
	sex!: string;

	@Expose({ name: 'LICENCE_ISSUE_NO' })
	issueNumber!: string;

	@Expose({ name: 'DRIVING_LICENCE_ISSUE_DATE' })
	issueDate!: string;

	@Expose({ name: 'PASSPORT_NUMBER' })
	passportNumber!: string;

	@Expose({ name: 'ADDR_1' })
	address!: string;

	@Expose({ name: 'ADDR_2' })
	addr2!: string;

	@Expose({ name: 'ADDR_3' })
	addressLine3!: string;

	@Expose({ name: 'ADDR_4' })
	addressLine4!: string;

	@Expose({ name: 'POSTOWN' })
	postTown!: string;

	@Expose({ name: 'OBD_POSTCODE' })
	postCode!: string;

	@Expose({ name: 'UK_RESIDENT' })
	ukResident!: string;
}
