import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDrivingLicenceCategory {
	@Expose({ name: 'DLC_CODE' })
	categoryCode!: string;

	@Expose({ name: 'DLC_DELETION_IND' })
	deletionMarker!: string;
}
