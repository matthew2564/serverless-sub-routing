import {Exclude, Expose, Transform, Type} from 'class-transformer';
import {DateTime} from "@dvsa/cvs-microservice-common/classes/utils/date";

@Exclude()
export class EncounterOffence {
	@Expose({ name: 'OFFENCE_CODE' })
	offenceType!: string;

	@Expose({ name: 'OFFENCE_DESCRIPTION' })
	offenceDescription!: string;

	@Expose({ name: 'OFFENCE_WELSH_DESCRIPTION' })
	offenceWelshDescription!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'OFFENCE_DATE' })
	offenceDate!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'EFFECTIVE_FROM' })
	effectiveFrom!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'EFFECTIVE_TO' })
	effectiveToDate!: string;

	@Expose({ name: 'ADDITIONAL_TEXT' })
	additionalText!: string;

	@Expose({ name: 'MOF_HAZCHEM_RISK' })
	hazchemRisk!: string;

	@Expose({ name: 'MOF_HAZCHEM_REASON' })
	hazchemReason!: string;

	@Expose({ name: 'DRIVER_TYPE' })
	driverType!: string;

	@Expose({ name: 'DRIVER_FORENAME' })
	driverForename!: string;

	@Expose({ name: 'DRIVER_SURNAME' })
	driverSurname!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'DATE_OF_BIRTH' })
	driverDateOfBirth!: string;

	@Expose({ name: 'DRIVER_LICENCE_NUMBER' })
	driverLicenceNumber!: string;

	@Expose({ name: 'ADDRESS_LINE_1' })
	addressLine1!: string;

	@Expose({ name: 'ADDRESS_LINE_2' })
	addressLine2!: string;

	@Expose({ name: 'ADDRESS_LINE_3' })
	addressLine3!: string;

	@Expose({ name: 'ADDRESS_LINE_4' })
	addressLine4!: string;

	@Expose({ name: 'POST_TOWN' })
	postTown!: string;

	@Expose({ name: 'POST_CODE' })
	postCode!: string;

	@Expose({ name: 'EXEMPTION_DETAILS' })
	exemptionDetails!: string;

	@Expose({ name: 'PNO_DRIVER_TYPE' })
	fpDriverType!: string;

	@Expose({ name: 'PNO_DRIVER_FORENAME' })
	fpDriverForename!: string;

	@Expose({ name: 'PNO_DRIVER_SURNAME' })
	fpDriverSurname!: string;

	@Expose({ name: 'PNO_DRIVER_LICENCE_NUM' })
	fpDriverLicenceNumber!: string;

	@Expose({ name: 'PNO_REFERENCE_NUM' })
	fpRefNo!: string;

	@Expose({ name: 'ENDORSABLE_IND' })
	endorseable!: string;

	@Expose({ name: 'PNO_AMOUNT' })
	fpAmount!: number;

	@Expose({ name: 'PNO_PAYMENT_DUE_DATE' })
	@Type(() => Date)
	fpPaymentDueDate!: Date;

	@Expose({ name: 'PNO_REFERRED_DATE' })
	@Type(() => Date)
	fpPaymentReferDate!: Date;
}
