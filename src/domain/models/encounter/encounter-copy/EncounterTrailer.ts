import { Exclude, Expose, Transform } from 'class-transformer';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { EncounterCopyNationality } from './EncounterCopyNationality';
import { EncounterCopyVehicleIdType } from './EncounterCopyVehicleIdType';
import { EncounterCopyRoadVehicleType } from './EncounterCopyRoadVehicleType';
import { EncounterCopyMake } from './EncounterCopyMake';
import { EncounterCopyLaden } from './EncounterCopyLaden';

@Exclude()
export class EncounterTrailer {
	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyNationality, obj))
	@Expose({ name: '' })
	nationality!: EncounterCopyNationality;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyVehicleIdType, obj))
	@Expose({ name: '' })
	vehicleIdType!: EncounterCopyVehicleIdType;

	@Expose({ name: 'TRAILER_IDENTIFIER' })
	trailerIdentifier!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyRoadVehicleType, obj))
	@Expose({ name: '' })
	vehicleType!: EncounterCopyRoadVehicleType;

	@Expose({ name: 'CUSTOM_MAKE' })
	customMake!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyMake, obj))
	@Expose({ name: '' })
	vehicleMake!: EncounterCopyMake;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'CHASSIS' })
	chassis!: string;

	@Expose({ name: 'MINISTRY_PLATE_NUM' })
	ministryPlate!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyLaden, obj))
	@Expose({ name: '' })
	laden!: EncounterCopyLaden;

	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;
}
