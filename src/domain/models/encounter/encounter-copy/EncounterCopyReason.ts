import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyReason {
	@Expose({ name: 'ERE_CODE' })
	code!: string;

	@Expose({ name: 'ERE_VERSION' })
	version!: string;

	@Expose({ name: 'ERE_DELETION' })
	deletionMarker!: string;

	@Expose({ name: 'ERE_SEQUENCE' })
	sequenceNumber!: string;

	@Expose({ name: 'ERE_CHECK_TYPE' })
	fkCtpCheckType!: string;

	@Expose({ name: 'ERE_NAME' })
	name!: string;

	@Expose({ name: 'ERE_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'ERE_SHORT_CODE' })
	shortCode!: string;

	@Expose({ name: 'ERE_PG35' })
	pg35EcRequired!: string;

	@Expose({ name: 'ERE_OFF_FLOW' })
	useOffenceFlow!: string;
}
