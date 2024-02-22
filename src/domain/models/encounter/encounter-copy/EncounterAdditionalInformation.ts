import { Exclude, Expose, Type } from 'class-transformer';
import { EncounterAdditionalText } from './EncounterAdditionalText';
import { EncounterCopySpecialReturn } from './EncounterCopySpecialReturn';
import { EncounterCopyDefectProsecutionCode } from './EncounterCopyDefectProsecutionCode';
import { EncounterCopyInspectionLevel } from './EncounterCopyInspectionLevel';

@Exclude()
export class EncounterAdditionalInformation {
	@Expose({ name: 'WEIGHT_CHECK_IND' })
	vehicleWeighed!: string;

	@Expose({ name: 'SPEED_LIMITER_CHECKED' })
	speedLimitedCheck!: string;

	@Expose({ name: 'ACTUAL_DRIVER_PAPER_TACHO_QTY' })
	analogueChartsActualDriver!: string;

	@Expose({ name: 'OTHER_DRIVER_PAPER_TACHO_QTY' })
	analogueChartsOtherDriver!: string;

	@Expose({ name: 'ACT_DRIVER_DIGITAL_TACHO_QTY' })
	digitalDaysActualDriver!: string;

	@Expose({ name: 'OTHER_DRIVER_DIGITAL_TACHO_QTY' })
	digitalDaysOtherDriver!: string;

	@Expose({ name: 'TACHO_CHECK_QTY' })
	tachoTotal!: string;

	@Expose({ name: 'MIU' })
	miu!: string;

	@Type(() => EncounterAdditionalText)
	additionalText!: EncounterAdditionalText[];

	@Type(() => EncounterCopySpecialReturn)
	specialReturnCode!: EncounterCopySpecialReturn;

	@Type(() => EncounterCopyDefectProsecutionCode)
	defectProsecution!: EncounterCopyDefectProsecutionCode;

	@Type(() => EncounterCopyInspectionLevel)
	inspectionLevel!: EncounterCopyInspectionLevel;
}
