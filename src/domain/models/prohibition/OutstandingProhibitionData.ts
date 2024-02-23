import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class OutstandingProhibitionData {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Transform(({ obj }) => obj.PROHIBITION_IND) // workaround for mapping multiple DB cols to same field
	@Expose()
	outstandingMechanicalProhibition!: string;

	@Transform(({ obj }) => obj.PROHIBITION_IND)
	@Expose()
	outstandingOffenceProhibition!: string;

	@Transform(({ obj }) => obj.PROHIBITION_IND)
	@Expose()
	outstandingOverweightProhibition!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ISSUE_DATE' })
	issueDate!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'INPUT_DATE' })
	inputDate!: string;

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
