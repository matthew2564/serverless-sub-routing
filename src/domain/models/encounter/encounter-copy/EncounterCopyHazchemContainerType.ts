import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyHazchemContainerType {
	@Expose({ name: 'HCT_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'HCT_DELETION_IND' })
	deletionMarker!: string;
}
