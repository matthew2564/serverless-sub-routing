import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyNoticeType {
	@Expose({ name: 'NTY_CODE' })
	code!: string;

	@Expose({ name: 'NOTICE_DESCRIPTION' })
	ntyDescription!: string;

	@Expose({ name: 'NTY_CURRENT_CODE' })
	currentCode!: string;

	@Expose({ name: 'NTY_ACT' })
	act!: string;

	@Expose({ name: 'NTY_CURRENT_VERSION' })
	currentVersion!: string;

	@Expose({ name: 'NTY_SUMMARY' })
	ntySummary!: string;

	@Expose({ name: 'NTY_TYPE_CODE' })
	typeCode!: string;

	@Expose({ name: 'NTY_SHORT_DESC' })
	ntyShortDescription!: string;

	@Expose({ name: 'NTY_OPERATOR_COPY' })
	operatorCopy!: string;

	@Expose({ name: 'NTY_DRIVER_REQUIRED' })
	driverRequired!: string;

	@Expose({ name: 'NTY_TRANSLATION_AVAILABLE' })
	translationAvailable!: string;

	@Expose({ name: 'NTY_SEQUENCE_NUMBER' })
	sequenceNumber!: string;

	@Expose({ name: 'NTY_NOTICE_TYPE_CATEGORY' })
	noticeTypeCategory!: string;

	@Expose({ name: 'NTY_AUTO_CLOSURE_PERIOD' })
	autoClosurePeriod!: string;

	@Expose({ name: 'NTY_CLOSE_FLAG' })
	closeFlag!: string;

	@Expose({ name: 'NTY_ETT_CODE' })
	ettCode!: string;

	@Expose({ name: 'NTY_NOTIFIABLE_FLAG' })
	notifiableFlag!: string;

	@Expose({ name: 'NTY_AEV_EVENT_CODE_CLOSE' })
	aevEventCodeClose!: string;

	@Expose({ name: 'NTY_AEV_EVENT_CODE_CLEAR' })
	aevEventCodeClear!: string;

	@Expose({ name: 'NTY_AEV_EVENT_CODE_REACTIVATE' })
	aevEventCodeReactivate!: string;
}
