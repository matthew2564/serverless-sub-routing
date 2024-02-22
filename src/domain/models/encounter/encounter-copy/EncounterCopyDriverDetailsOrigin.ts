import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDriverDetailsOrigin {
	@Expose({ name: 'DDO_CODE' })
	driverDetailsOriginCode!: string;

	@Expose({ name: 'DDO_DESCRIPTION' })
	originDescription!: string;

	@Expose({ name: 'DDO_DELETION_IND' })
	deletionMarker!: string;
}
