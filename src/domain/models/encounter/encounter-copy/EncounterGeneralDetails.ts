import { Exclude, Expose } from 'class-transformer';
import { EncounterCopyLocation } from './EncounterCopyLocation';
import { EncounterStoppingOfficer } from './EncounterStoppingOfficer';

@Exclude()
export class EncounterGeneralDetails {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'RTE_VEH_ID' })
	vehicleIdentifier!: string;

	@Expose({ name: 'ENC_DATE' })
	startDate!: Date;

	@Expose({ name: 'ENC_TIME' })
	startTime!: string;

	@Expose({ name: 'EMP_NAME' })
	examiner!: string;

	@Expose({ name: 'EXAMINER_ID' })
	examinerId!: string;

	@Expose({ name: 'EXAMINER_EMAIL' })
	examinerEmail!: string;

	@Expose({ name: 'EXAM_OFFICER_TYPE' })
	examOfficerType!: string;

	@Expose({ name: 'TOWING_VEHICLE_ENCOUNTER_ID' })
	towingVehicleEncounterID!: string;

	@Expose({ name: 'CSI_GENERATED_NUMBER' })
	csiGeneratedNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid!: string;

	@Expose({ name: 'ACTION_CODE' })
	actionCode!: string;

	@Expose({ name: 'VEN_LAST_UPDATED' })
	lastUpdated!: Date;

	encounterLocationObject!: EncounterCopyLocation;
	stoppingOfficer!: EncounterStoppingOfficer;
}
