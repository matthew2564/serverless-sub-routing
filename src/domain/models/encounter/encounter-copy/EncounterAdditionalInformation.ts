import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { EncounterAdditionalText } from './EncounterAdditionalText';
import { EncounterCopySpecialReturn } from './EncounterCopySpecialReturn';
import { EncounterCopyDefectProsecutionCode } from './EncounterCopyDefectProsecutionCode';
import { EncounterCopyInspectionLevel } from './EncounterCopyInspectionLevel';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

@Exclude()
export class EncounterAdditionalInformation {
	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyInspectionLevel, obj))
	@Expose({ name: '' })
	inspectionLevel!: EncounterCopyInspectionLevel;

	@Expose({ name: 'WEIGHT_CHECK_IND' })
	vehicleWeighed!: string;

	@Expose({ name: 'SPEED_LIMITER_CHECKED' })
	speedLimitedCheck!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectProsecutionCode, obj))
	@Expose({ name: '' })
	defectProsecution!: EncounterCopyDefectProsecutionCode;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopySpecialReturn, obj))
	@Expose({ name: '' })
	specialReturnCode!: EncounterCopySpecialReturn;

	@Type(() => EncounterAdditionalText)
	additionalText!: EncounterAdditionalText[];

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
}
