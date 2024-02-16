import { Expose } from 'class-transformer';

export class EncounterData {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'VEHICLE_IDENTIFIER' })
	vehicleIdentifier!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_LICENCE_NO' })
	operatorLicenceNumberAtEncounter!: string;

	@Expose({ name: 'CHECKSITE_NAME' })
	checksiteName!: string;

	@Expose({ name: 'CHECKSITE_ROAD' })
	checksiteRoad!: string;

	@Expose({ name: 'CHECKSITE_TOWN' })
	checksiteTown!: string;

	@Expose({ name: 'CHECKSITE_COUNTY' })
	checksiteCounty!: string;

	@Expose({ name: 'ENCOUNTER_DATE' })
	encounterDate!: string;

	@Expose({ name: 'EXAM_OFFICER_TYPE' })
	examOfficerType!: string;

	@Expose({ name: 'ROADSIDE_VEHICLE_TYPE' })
	roadsideVehicleType!: string;

	@Expose({ name: 'MAKE' })
	make!: string;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'TOWING_VEHICLE_ENCOUNTER_ID' })
	towingVehicleEncounterID!: string;

	@Expose({ name: 'PROHIBITION_NOTICE' })
	prohibitionNotice!: string;

	@Expose({ name: 'PROHIBITION_OUTSTANDING' })
	prohibitionOutstanding!: string;
}
