import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyInspectionLevel {
	@Expose({ name: 'ILE_INSPECTION_LEVEL' })
	inspectionLevel!: string;

	@Expose({ name: 'ILE_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'ILE_DELETION_IND' })
	deletionMarker!: string;
}
