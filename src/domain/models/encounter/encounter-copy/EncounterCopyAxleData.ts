import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyAxleData {
	@Expose({ name: 'AXLE_NUMBER' })
	axleNumber!: string;

	@Expose({ name: 'DB_AXLE_NUMBER' })
	dbAxleNumber!: string;

	@Expose({ name: 'PERMITTED_WEIGHT' })
	permittedWeight!: string;

	@Expose({ name: 'ACTUAL_WEIGHT' })
	actualWeight!: string;

	@Expose({ name: 'DESIGN_WEIGHT' })
	designWeight!: string;

	@Expose({ name: 'COMPENSATING_CODE' })
	compensatingCode!: string;

	@Expose({ name: 'OFFSIDE_WEIGHT' })
	offsideWeight!: string;

	@Expose({ name: 'NEARSIDE_WEIGHT' })
	nearsideWeight!: string;

	@Expose({ name: 'EXCESSWEIGHT' })
	excessWeight!: string;

	@Expose({ name: 'EXCESSWEIGHT_PERCENT' })
	excessWeightPercent!: string;

	@Expose({ name: 'AXLE_VEH_TYPE' })
	axleVehicleType!: string;
}
