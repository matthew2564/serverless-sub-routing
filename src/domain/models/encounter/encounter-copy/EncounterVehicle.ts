import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterVehicle {
	@Expose({ name: 'VEHICLE_IDENTIFIER' })
	vehicleIdentifier!: string;

	@Expose({ name: 'CUSTOM_MAKE' })
	customMake!: string;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'VIN' })
	vin!: string;

	@Expose({ name: 'MINISTRY_PLATE_NUM' })
	ministryPlate!: string;

	@Expose({ name: 'SEATING_CAPACITY' })
	seatingCapacity!: string;

	@Expose({ name: 'ODOMETER' })
	odometer!: string;

	@Expose({ name: 'ODOMETER_UNIT' })
	odometerUnit!: string;
}
