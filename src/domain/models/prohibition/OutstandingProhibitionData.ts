import { Expose, Type } from 'class-transformer';

export class OutstandingProhibitionData {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'PROHIBITION_IND' }) // Assuming this maps to all three prohibition types; adjust if necessary
	outstandingMechanicalProhibition!: string;

	@Expose({ name: 'PROHIBITION_IND' }) // Assuming reuse; if different columns are intended, need to adjust
	outstandingOffenceProhibition!: string;

	@Expose({ name: 'PROHIBITION_IND' }) // Assuming reuse; if different columns are intended, need to adjust
	outstandingOverweightProhibition!: string;

	@Expose({ name: 'ISSUE_DATE' })
	@Type(() => Date) // Convert to Date object
	issueDate!: Date;

	@Expose({ name: 'INPUT_DATE' })
	@Type(() => Date)
	inputDate!: Date;

	@Expose({ name: 'ISSUE_OFF_FNAME' })
	examinerFirstName!: string;

	@Expose({ name: 'ISSUE_OFF_SNAME' })
	examinerLastName!: string;

	@Expose({ name: 'FK_NTY_CODE' })
	noticeCode!: string;

	@Expose({ name: 'FK_VIT_CODE' })
	vehicleIdType!: string;

	@Expose({ name: 'VEN_CLIENT_GUID' })
	clientGuid!: string;
}
