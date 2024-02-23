import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { EncounterCopyDriverDetailsOrigin } from './EncounterCopyDriverDetailsOrigin';
import { EncounterCopyNationality } from './EncounterCopyNationality';
import { EncounterCopyDrivingLicenceType } from './EncounterCopyDrivingLicenceType';
import { EncounterCopyDrivingLicenceCategory } from './EncounterCopyDrivingLicenceCategory';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

@Exclude()
export class EncounterDriver {
	@Expose({ name: 'DRIVER_TYPE' })
	source!: string;

	@Expose({ name: 'FORENAME' })
	forename!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
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

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDriverDetailsOrigin, obj))
	@Expose({ name: '' })
	detailsOrigin!: EncounterCopyDriverDetailsOrigin;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDrivingLicenceCategory, obj))
	@Expose({ name: '' })
	drivingLicenceCategory!: EncounterCopyDrivingLicenceCategory;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDrivingLicenceType, obj))
	@Expose({ name: '' })
	drivingLicenceType!: EncounterCopyDrivingLicenceType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyNationality, obj))
	@Expose({ name: '' })
	driverNationality!: EncounterCopyNationality;
}
