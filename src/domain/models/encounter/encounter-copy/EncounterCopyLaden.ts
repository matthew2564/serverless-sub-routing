import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyLaden {
	@Expose({ name: 'LIN_CODE' })
	code!: string;

	@Expose({ name: 'LIN_DESC' })
	description!: string;

	@Expose({ name: 'LIN_SEQ_NUM' })
	sequenceNumber!: string;

	@Expose({ name: 'LIN_DELETION_IND' })
	deletionMarker!: string;
}
