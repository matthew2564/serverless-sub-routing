import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyFixedPenalties {
	@Expose({ name: 'NOTICE_REFERENCE' })
	noticeReference!: string;

	@Expose({ name: 'DRIVER' })
	driver!: string;

	@Expose({ name: 'AMOUNT_DUE' })
	amountDue!: string;

	@Expose({ name: 'PNO_PNS_CODE' })
	pnsCode!: string;

	@Expose({ name: 'ISSUE_UNIT_TYPE' })
	issueUnitType!: string;

	@Expose({ name: 'VEHICLE_ID' })
	vehicleId!: string;

	@Expose({ name: 'PNO_DLS_CODE' })
	dlsCode!: string;

	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsableFlag!: string;

	@Expose({ name: 'ENCOUNTER_ID' })
	encounterId!: string;

	@Expose({ name: 'INPUT_TIME' })
	inputTime!: string;

	@Expose({ name: 'PNO_NOTICE_CODE' })
	noticeCode!: string;

	@Expose({ name: 'NTY_DESC' })
	noticeDescription!: string;

	@Expose({ name: 'AONX_AOF_GEN_NUM' })
	actualOffenceGenNum!: string;

	@Expose({ name: 'FP_PAYMENT_STATUS' })
	fixedPenaltyNoticePaymentStatus!: string;
}
