import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyPortOfExit {
	@Expose({ name: 'POR_CODE' })
	portCode!: string;

	@Expose({ name: 'POR_DESCRIPTION' })
	portDescription!: string;

	@Expose({ name: 'POR_DELETION_IND' })
	deletionMarker!: string;
}
