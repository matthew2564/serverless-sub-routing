import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectSection {
	@Expose({ name: 'DSE_DESC' })
	defectSection!: string;

	@Expose({ name: 'DCD_PART' })
	defectCategoryPart!: string;

	@Expose({ name: 'DCD_DESC' })
	defectCategory!: string;

	@Expose({ name: 'DCD_NUMBER' })
	defectCategoryNumber!: string;

	@Expose({ name: 'DSE_SECTION' })
	defectSectionNum!: string;

	@Expose({ name: 'DSE_DELETION_IND' })
	deletionMarker!: string;
}
