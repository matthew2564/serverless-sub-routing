import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyVehicleIdType {
	@Expose({ name: 'MVI_CODE' })
	code!: string;

	@Expose({ name: 'MVI_SHORT_CODE' })
	shortCode!: string;

	@Expose({ name: 'MVI_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'MVI_SEQUENCE_NUMBER' })
	sequenceNumber!: string;

	@Expose({ name: 'MVI_VEH_TRAIL' })
	vehicleTrailerIndicator!: string;

	@Expose({ name: 'MVI_DELETION_IND' })
	deletionMarker!: string;
}
