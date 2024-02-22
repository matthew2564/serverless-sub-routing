import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyRemovalInstruction {
	@Expose({ name: 'RIS_CODE' })
	code!: string;

	@Expose({ name: 'RIS_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'RIS_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'RIS_SEQ_NUM' })
	sequenceNumber!: string;
}
