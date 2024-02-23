import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyPenaltyNoticeStatus } from './EncounterCopyPenaltyNoticeStatus';
import { EncounterCopyDrivingLicenceStatus } from './EncounterCopyDrivingLicenceStatus';
import { ActualPayment } from '../../fixed-penalty/ActualPayment';
import { EncounterCopyFpnOffenceDetail } from './EncounterCopyFpnOffenceDetail';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

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

	encounterUnit!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyPenaltyNoticeStatus, obj))
	@Expose({ name: '' })
	noticePaymentStatus!: EncounterCopyPenaltyNoticeStatus;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDrivingLicenceStatus, obj))
	@Expose({ name: '' })
	licenceCollectionStatus!: EncounterCopyDrivingLicenceStatus;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyFpnOffenceDetail, obj))
	@Expose({ name: '' })
	offenceDetails!: EncounterCopyFpnOffenceDetail;

	@Transform(({ obj }) => plainToInstanceOrNull(ActualPayment, obj))
	@Expose({ name: '' })
	paymentDetails!: ActualPayment;
}
