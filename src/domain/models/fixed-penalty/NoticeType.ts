import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NoticeType {
	@Expose({ name: 'CODE' })
	code!: string;

	@Expose({ name: 'NTY_DESC' })
	ntyDescription!: string;

	@Expose({ name: 'CURRENT_CODE' })
	currentCode!: string;

	@Expose({ name: 'ACT' })
	act!: number;

	@Expose({ name: 'CURRENT_VERSION' })
	currentVersion!: number;

	@Expose({ name: 'TYPE_CODE' })
	typeCode!: string;

	@Expose({ name: 'NTY_SHORT_DESC' })
	ntyShortDescription!: string;

	@Expose({ name: 'OPERATOR_COPY' })
	operatorCopy!: string;

	@Expose({ name: 'DRIVER_REQUIRED' })
	driverRequired!: string;

	@Expose({ name: 'TRANSLATION_AVAILABLE' })
	translationAvailable!: string;

	@Expose({ name: 'SEQUENCE_NUMBER' })
	sequenceNumber!: number;

	@Expose({ name: 'NOTICE_TYPE_CATEGORY' })
	noticeTypeCategory!: string;

	@Expose({ name: 'AUTO_CLOSURE_PERIOD' })
	autoClosurePeriod!: number;

	@Expose({ name: 'NTY_SUMMARY' })
	ntySummary!: string;

	@Expose({ name: 'CLOSE_FLAG' })
	closeFlag!: string;

	@Expose({ name: 'ETT_CODE' })
	ettCode!: string;

	@Expose({ name: 'AEV_EVENT_CODE_CLOSE' })
	aevEventCodeClose!: string;

	@Expose({ name: 'AEV_EVENT_CODE_CLEAR' })
	aevEventCodeClear!: string;

	@Expose({ name: 'AEV_EVENT_CODE_REACTIVATE' })
	aevEventCodeReactivate!: string;

	@Expose({ name: 'NOTIFIABLE_FLAG' })
	notifiableFlag!: string;
}
