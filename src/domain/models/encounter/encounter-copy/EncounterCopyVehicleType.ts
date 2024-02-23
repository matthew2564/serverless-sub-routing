import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyVehicleType {
	@Expose({ name: 'MVT_INTERNAL_NUM' })
	internalNumber!: string;

	@Expose({ name: 'MVT_VEHICLE_TYPE' })
	vehicleType!: string;

	@Expose({ name: 'MVT_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'MVT_OPERATOR_IND' })
	operatorIdentifierInd!: string;
}
