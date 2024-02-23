import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyBodyType {
	@Expose({ name: 'BTY_CODE' })
	code!: string;

	@Expose({ name: 'BTY_VERSION' })
	version!: string;

	@Expose({ name: 'BTY_NAME' })
	name!: string;

	@Expose({ name: 'BTY_BODY_TYPE' })
	description!: string;

	@Expose({ name: 'BTY_APPLIC_IND' })
	applicability!: string;

	@Expose({ name: 'BTY_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'BTY_SEQ_NUM' })
	sequenceNumber!: string;
}
