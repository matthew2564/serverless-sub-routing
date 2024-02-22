import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyNotices {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'RTE_VEH_ID' })
	unitId!: string;

	@Expose({ name: 'UNIT_TYPE' })
	noticeUnit!: string;

	@Expose({ name: '' })
	issueUnitType!: string;

	@Expose({ name: 'NOTICE_TYPE' })
	noticeCode!: string;

	@Expose({ name: 'NOTICE_DESCRIPTION' })
	noticeDescription!: string;

	@Expose({ name: 'NOTICE_STATUS' })
	noticeStatus!: string;

	@Expose({ name: 'ORGINAL_ISSUE_DATE' })
	originalProhibDate!: string;

	@Expose({ name: 'ORGINAL_ISSUE_TIME' })
	originalProhibTime!: string;

	@Expose({ name: 'NTC_ISSUE_DATE' })
	issueDate!: string;

	@Expose({ name: 'NTC_ISSUE_TIME' })
	issueTime!: string;

	@Expose({ name: 'DELAY_DAYS' })
	delayDays!: string;

	@Expose({ name: 'IMMEDIATE_IND' })
	immediateProhib!: string;

	@Expose({ name: 'DEFERRAL_PERIOD' })
	deferralHours!: string;

	@Expose({ name: 'NOTICE_IN_FORCE_DATE' })
	inForceDate!: string;

	@Expose({ name: 'NOTICE_IN_FORCE_TIME' })
	inForceTime!: string;

	@Expose({ name: 'ISSUE_OFF_FNAME' })
	issueOffFname!: string;

	@Expose({ name: 'ISSUE_OFF_SNAME' })
	issueOffSname!: string;

	@Expose({ name: 'NTC_DIRECTION' })
	direction!: string;

	@Expose({ name: 'NTC_OTHER_LOCATION' })
	otherLocation!: string;

	@Expose({ name: 'NTC_REST_HOURS' })
	restPeriodHours!: string;

	@Expose({ name: 'INPUT_DATE' })
	inputDateTime!: string;

	@Expose({ name: 'NTC_TACHO_DUE' })
	tachoInspectionDue!: string;

	@Expose({ name: 'NTC_TACHO_LAST_CAL' })
	tachoLastCalibrated!: string;

	@Expose({ name: 'PNO_NOT_REF_SOURCE' })
	noticeRefSource!: string;

	@Expose({ name: 'RAW_NOTICE_TYPE' })
	code!: string;

	@Expose({ name: '' })
	criteriaMet!: string;

	@Expose({ name: 'RECEIVED_BY_FORENME' })
	receivedByFirstName!: string;

	@Expose({ name: 'RECEIVED_BY_SURNAME' })
	receivedByLastName!: string;

	@Expose({ name: 'TRANSLATION_MKR' })
	translationIssued!: string;

	@Expose({ name: 'REFERENCE_NUMBER' })
	noticeRef!: string;

	@Expose({ name: 'AMOUNT_DUE' })
	fixedPenAmount!: string;

	@Expose({ name: 'PAYMENT_DUE' })
	paymentDue!: string;

	@Expose({ name: 'DRIVER_NAME' })
	driver!: string;

	@Expose({ name: 'REFRD_FOR_INVESTIG' })
	additionalAction!: string;

	@Expose({ name: 'OFFENCE_DATE' })
	dateOfOffence!: string;

	@Expose({ name: 'EXEMPT_FROM_PROHIBITION' })
	historicalOffence!: string;

	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsableOffence!: string;

	@Expose({ name: 'ADDITIONAL_TEXT' })
	notes!: string;

	@Expose({ name: 'RELEVANT_VRM' })
	relevantUnitId!: string;

	@Expose({ name: 'OTHER_OPERATOR' })
	historicalOperator!: string;

	@Expose({ name: 'ADDITIONAL_TEXT' })
	additionalText!: string;

	@Expose({ name: 'TOWING_VEH_ID' })
	towingVehId!: string;

	@Expose({ name: 'DANGER_GOODS_IMM_PROH_IND' })
	dangerGoodsImmProhInd!: string;
}
