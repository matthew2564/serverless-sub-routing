import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDrivingLicenceType {
	@Expose({ name: 'DLT_CODE' })
	licenceTypeCode!: string;

	@Expose({ name: 'DLT_DESCRIPTION' })
	licenceTypeDescription!: string;

	@Expose({ name: 'DLT_DELETION_IND' })
	deletionMarker!: string;
}
