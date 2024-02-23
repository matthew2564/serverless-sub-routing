import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyLocation } from './EncounterCopyLocation';
import { EncounterStoppingOfficer } from './EncounterStoppingOfficer';
import { EncounterCopyVehicleIdType } from './EncounterCopyVehicleIdType';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { EncounterCopyRoadVehicleType } from './EncounterCopyRoadVehicleType';
import { EncounterCopyNationality } from './EncounterCopyNationality';
import { EncounterCopyReason } from './EncounterCopyReason';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterGeneralDetails {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyVehicleIdType, obj))
	@Expose({ name: '' })
	vehicleIdentifierType!: EncounterCopyVehicleIdType;

	@Expose({ name: 'RTE_VEH_ID' })
	vehicleIdentifier!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyRoadVehicleType, obj))
	@Expose({ name: '' })
	vehicleType!: EncounterCopyRoadVehicleType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyNationality, obj))
	@Expose({ name: '' })
	nationality!: EncounterCopyNationality;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'ENC_DATE' })
	startDate!: string;

	@Expose({ name: 'ENC_TIME' })
	startTime!: string;

	encounterLocationObject!: EncounterCopyLocation;

	@Expose({ name: 'EMP_NAME' })
	examiner!: string;

	@Expose({ name: 'EXAMINER_ID' })
	examinerId!: string;

	@Expose({ name: 'EXAMINER_EMAIL' })
	examinerEmail!: string;

	@Expose({ name: 'EXAM_OFFICER_TYPE' })
	examOfficerType!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyReason, obj))
	@Expose({ name: '' })
	encounterReason!: EncounterCopyReason;

	@Exclude()
	@Expose({ name: 'TOWING_VEHICLE_ENCOUNTER_ID' })
	towingVehicleEncounterID!: string;

	@Exclude()
	@Expose({ name: 'CSI_GENERATED_NUMBER' })
	csiGeneratedNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid!: string;

	@Expose({ name: 'ACTION_CODE' })
	actionCode!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'VEN_LAST_UPDATED' })
	lastUpdated!: string;

	stoppingOfficer!: EncounterStoppingOfficer;
}
