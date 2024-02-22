import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectText {
	@Expose({ name: 'DFD_DESC' })
	defectDesc!: string;

	@Expose({ name: 'DCD_DESC' })
	defectCategory!: string;

	@Expose({ name: 'DUD_DESC' })
	defectText!: string;

	@Expose({ name: 'DUD_NUM' })
	defectNumber!: string;

	@Expose({ name: 'DCD_NUMBER' })
	defectCategoryNumber!: string;

	@Expose({ name: 'DSD_DESC' })
	defectSubSection!: string;

	@Expose({ name: 'DSE_DESC' })
	defectSection!: string;

	@Expose({ name: 'DCD_PART' })
	defectCategoryPart!: string;

	@Expose({ name: 'DUD_DELETION_IND' })
	deletionMarker!: string;
}
