import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOpLicenceStatus {
	@Expose({ name: 'LDS_DISC_TYPE' })
	licenceDiscType!: string;

	@Expose({ name: 'LDS_DISC_DESCRIPTION' })
	licenceDiscDescription!: string;

	@Expose({ name: 'LDS_DELETION_IND' })
	deletionMarker!: string;
}
