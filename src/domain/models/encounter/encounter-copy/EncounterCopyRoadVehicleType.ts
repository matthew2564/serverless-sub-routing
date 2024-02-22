import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyRoadVehicleType {
	@Expose({ name: 'RVT_NUMBER' })
	key!: string;

	@Expose({ name: 'RVT_VEH_TYPE' })
	vehicleType!: string;

	@Expose({ name: 'RVT_TRACTOR' })
	tractorIndicator!: string;

	@Expose({ name: 'RVT_RANK' })
	sequenceNumber!: string;

	@Expose({ name: 'RVT_OFFENCE_FLOW' })
	useOffenceFlow!: string;

	@Expose({ name: 'RVT_DCA_PART' })
	dcaPart!: string;

	@Expose({ name: 'RVT_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'RVT_DELETION' })
	deletionMarker!: string;

	@Expose({ name: 'VT_VEH_TYPE_DESC' })
	vehicleTypeDescription!: string;
}
