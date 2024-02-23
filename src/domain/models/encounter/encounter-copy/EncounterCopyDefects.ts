import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyPartMake } from './EncounterCopyPartMake';
import { EncounterCopyDefectCategory } from './EncounterCopyDefectCategory';
import { EncounterCopyDefectSection } from './EncounterCopyDefectSection';
import { EncounterCopyDefectSubSection } from './EncounterCopyDefectSubSection';
import { EncounterCopyDefectDesc } from './EncounterCopyDefectDesc';
import { EncounterCopyDefectText } from './EncounterCopyDefectText';
import { EncounterCopyDefectSeverity } from './EncounterCopyDefectSeverity';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

@Exclude()
export class EncounterCopyDefects {
	@Expose({ name: 'FK_VEN_GENERATED_NUMBER' })
	encounterId!: string;

	@Expose({ name: '' })
	id!: string;

	@Expose({ name: 'RTE_VEH_ID' })
	unitId!: string;

	@Expose({ name: 'DEFECT_SECTION_VALUE' })
	defectSectionValue!: string;

	@Expose({ name: 'SOD_DESC' })
	severityDesc!: string;

	@Expose({ name: '' })
	make!: string;

	@Expose({ name: 'ADF_MAKE' })
	customPartMake!: string;

	@Expose({ name: 'ADE_SIZE' })
	size!: string;

	@Expose({ name: 'SERIAL_NUMBER' })
	serialNumber!: string;

	@Expose({ name: 'AXLE_NUMBER' })
	axle!: string;

	@Expose({ name: 'SIDE' })
	side!: string;

	@Expose({ name: 'POSITION_ON_AXLE' })
	positionOnAxle!: string;

	@Expose({ name: 'ADE_END' })
	end!: string;

	@Expose({ name: 'VERTICAL_POSITION' })
	verticalPosition!: string;

	@Expose({ name: 'RECOMMENDED_ACTION' })
	recommendedAction!: string;

	@Expose({ name: 'ACTUAL_ACTION' })
	actualAction!: string;

	@Expose({ name: 'NON_CMPLNCE_RSN' })
	deviation!: string;

	@Expose({ name: 'ADDITIONAL_TEXT' })
	additionalText!: string;

	@Expose({ name: 'MECH_DEFECT_CHECK' })
	mechanicalDefectCheck!: string;

	@Expose({ name: 'SGNFCANCE_REASON' })
	significanceReason!: string;

	@Expose({ name: 'ADF_SIG_MAINT' })
	maintenanceMarker!: string;

	@Expose({ name: 'ADF_SEQUENCE_NUMBER' })
	sequenceNumber!: string;

	@Expose({ name: 'DUD_GEN_NUM' })
	dudGenNum!: number;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyPartMake, obj))
	@Expose({ name: '' })
	partMakes!: EncounterCopyPartMake | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectCategory, obj))
	@Expose({ name: '' })
	defectCategory!: EncounterCopyDefectCategory | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectSection, obj))
	@Expose({ name: '' })
	defectSection!: EncounterCopyDefectSection | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectSubSection, obj))
	@Expose({ name: '' })
	defectSubSection!: EncounterCopyDefectSubSection | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectDesc, obj))
	@Expose({ name: '' })
	defectDesc!: EncounterCopyDefectDesc | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectText, obj))
	@Expose({ name: '' })
	defectText!: EncounterCopyDefectText | null;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyDefectSeverity, obj))
	@Expose({ name: '' })
	defectSeverity!: EncounterCopyDefectSeverity | null;
}
