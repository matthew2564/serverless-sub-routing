import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectSeverity {
	@Expose({ name: 'DSE_DESC' })
	defectSection!: string;

	@Expose({ name: 'SOD_DESC' })
	severityDesc!: string;

	@Expose({ name: 'SOD_ACTION' })
	requiredAction!: string;

	@Expose({ name: 'DCD_NUMBER' })
	defectCategoryNumber!: string;

	@Expose({ name: 'DCD_DESC' })
	defectCategory!: string;

	@Expose({ name: 'DUD_DESC' })
	defectText!: string;

	@Expose({ name: 'DFD_POS_IND' })
	positionalIndicator!: string;

	@Expose({ name: 'SOD_NUMBER' })
	severityNumber!: string;

	@Expose({ name: 'DSD_DESC' })
	defectSubSection!: string;

	@Expose({ name: 'DFD_DESC' })
	defectDesc!: string;

	@Expose({ name: 'SOD_GEN_NUMBER' })
	severityGenNum!: string;

	@Expose({ name: 'DCD_PART' })
	defectCategoryPart!: string;

	@Expose({ name: 'SOD_DELETION_IND' })
	deletionMarker!: string;
}
