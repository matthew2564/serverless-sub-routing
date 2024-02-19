import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterAxle {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'AXLE_NUMBER' })
	axleNumber!: number;

	@Expose({ name: 'COMPENSATING_CODE' })
	compensatingCode!: string;

	@Expose({ name: 'ACTUAL_WEIGHT' })
	actualWeight!: number;

	@Expose({ name: 'PERMITTED_WEIGHT' })
	permittedWeight!: number;

	@Expose({ name: 'OVERWEIGHT' })
	overweight!: number;

	@Expose({ name: 'PERCENT_OVERWEIGHT' })
	percentOverweight!: number;

	@Expose({ name: 'AXLE_VEH_TYPE' })
	axleVehicleType!: string;
}
