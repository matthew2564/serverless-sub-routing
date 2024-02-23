import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectCategory {
	@Expose({ name: 'DCD_PART' })
	defectCategoryPart!: number;

	@Expose({ name: 'DCD_DESC' })
	defectCategory!: string;

	@Expose({ name: 'DCD_NUMBER' })
	defectCategoryNumber!: number;

	@Expose({ name: 'DCD_DELETION_IND' })
	deletionMarker!: string;
}
