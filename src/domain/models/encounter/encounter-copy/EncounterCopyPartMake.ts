import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyPartMake {
	@Expose({ name: 'MPM_INT_NUM' })
	internalNumber!: string;

	@Expose({ name: 'MPM_PART_MAKE' })
	partMake!: string;

	@Expose({ name: 'MPM_DELETION_IND' })
	deletionMarker!: string;
}
