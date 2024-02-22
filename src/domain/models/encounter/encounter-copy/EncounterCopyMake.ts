import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyMake {
	@Expose({ name: 'MAK_INT_NUM' })
	internalNumber!: string;

	@Expose({ name: 'MAK_RVT_NUM' })
	fkRvtNumber!: string;

	@Expose({ name: 'MAK_MAKE' })
	vehicleMake!: string;

	@Expose({ name: 'MAK_DELETION_IND' })
	deletionMarker!: string;
}
