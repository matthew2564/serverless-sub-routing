import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOpLicenceType {
	@Expose({ name: 'OLT_CODE' })
	licenceTypeCode!: string;

	@Expose({ name: 'OLT_DESCRIPTION' })
	licenceTypeDescription!: string;

	@Expose({ name: 'OLT_DELETION_IND' })
	deletionMarker!: string;
}
