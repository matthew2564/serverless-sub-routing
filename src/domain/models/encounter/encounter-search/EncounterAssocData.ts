import { Exclude, Expose, Type } from 'class-transformer';
import { EncounterCheckType } from './EncounterCheckType';
import { EncounterSearchDriver } from './EncounterSearchDriver';

@Exclude()
export class EncounterAssocData {
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

	@Expose({ name: 'INSPECTION_LEVEL' })
	inspectionLevel!: number;

	@Expose({ name: 'ACTION_CODE' })
	actionCode!: string;

	@Expose({ name: 'EMP_NAME' })
	empName!: string;

	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsableFlag!: string;

	@Expose({ name: 'WEIGHT_CHECK_IND' })
	weightCheckInd!: string;

	@Expose({ name: 'ENCOUNTER_REASON' })
	encounterReason!: string;

	immobilisationFlag!: string;
	outProhibition!: string;
	sanctionCode!: string;
	numberOfTrailers!: number;

	@Type(() => EncounterSearchDriver)
	driverName!: EncounterSearchDriver[] | null;

	@Type(() => EncounterCheckType)
	checkType!: EncounterCheckType;
}
