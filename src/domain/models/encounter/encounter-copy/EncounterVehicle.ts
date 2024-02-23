import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyVehicleIdType } from './EncounterCopyVehicleIdType';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { EncounterCopyRoadVehicleType } from './EncounterCopyRoadVehicleType';
import { EncounterCopyNationality } from './EncounterCopyNationality';
import { EncounterCopyMake } from './EncounterCopyMake';
import { EncounterCopyBodyType } from './EncounterCopyBodyType';
import { EncounterCopyLaden } from './EncounterCopyLaden';

@Exclude()
export class EncounterVehicle {
	@Expose({ name: 'VEHICLE_IDENTIFIER' })
	vehicleIdentifier!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyVehicleIdType, obj))
	@Expose({ name: '' })
	vehicleIdentifierType!: EncounterCopyVehicleIdType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyRoadVehicleType, obj))
	@Expose({ name: '' })
	vehicleType!: EncounterCopyRoadVehicleType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyNationality, obj))
	@Expose({ name: '' })
	nationality!: EncounterCopyNationality;

	@Expose({ name: 'CUSTOM_MAKE' })
	customMake!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyMake, obj))
	@Expose({ name: '' })
	vehicleMake!: EncounterCopyMake;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'VIN' })
	vin!: string;

	@Expose({ name: 'MINISTRY_PLATE_NUM' })
	ministryPlate!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyBodyType, obj))
	@Expose({ name: '' })
	bodyType!: EncounterCopyBodyType;

	@Expose({ name: 'SEATING_CAPACITY' })
	seatingCapacity!: string;

	@Expose({ name: 'ODOMETER' })
	odometer!: string;

	@Expose({ name: 'ODOMETER_UNIT' })
	odometerUnit!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyLaden, obj))
	@Expose({ name: '' })
	laden!: EncounterCopyLaden;
}
