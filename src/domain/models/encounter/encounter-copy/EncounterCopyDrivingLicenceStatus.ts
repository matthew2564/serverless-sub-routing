import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDrivingLicenceStatus {
	@Expose({ name: 'DLS_CODE' })
	code!: string;

	@Expose({ name: 'DLS_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'DLS_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'DLS_SEQ_NUM' })
	sequenceNumber!: string;
}
