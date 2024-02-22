import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectSubSection {
	@Expose({ name: 'DSE_DESC' })
	defectSection!: string;

	@Expose({ name: 'DCD_PART' })
	defectCategoryPart!: string;

	@Expose({ name: 'DCD_DESC' })
	defectCategory!: string;

	@Expose({ name: 'DCD_NUMBER' })
	defectCategoryNumber!: string;

	@Expose({ name: 'DSD_DESC' })
	defectSubSection!: string;

	@Expose({ name: 'DSD_SUBSEC' })
	defectSubSectionNum!: string;

	@Expose({ name: 'DSD_DELETION_IND' })
	deletionMarker!: string;
}
