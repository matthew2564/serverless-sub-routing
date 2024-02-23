import { Exclude, Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { EncounterAxle } from './EncounterAxle';
import { EncounterOffence } from './EncounterOffence';
import { EncounterNotice } from './EncounterNotice';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterDetail {
	@Expose({ name: 'ENCOUNTER_ID' })
	encounterIdentifier!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_LICENCE_NO' })
	operatorLicenceNumberAtEncounter!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_NAME' })
	operatorLicenceNameAtEncounter!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_ADDR_1' })
	operatorLicenceAddr1!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_ADDR_2' })
	operatorLicenceAddr2!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_ADDR_3' })
	operatorLicenceAddr3!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_ADDR_4' })
	operatorLicenceAddr4!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_POST_TOWN' })
	operatorLicencePostTown!: string;

	@Expose({ name: 'ENCOUNTER_OPERATOR_POST_CODE' })
	operatorLicencePostCode!: string;

	@Expose({ name: 'VEHICLE_IDENTIFIER' })
	vehicleIdentifier!: string;

	@Expose({ name: 'ROADSIDE_VEHICLE_TYPE' })
	roadsideVehicleType!: string;

	@Expose({ name: 'MAKE' })
	make!: string;

	@Expose({ name: 'MODEL' })
	model!: string;

	@Expose({ name: 'ODOMETER_COUNT' })
	odometerReading!: number;

	@Expose({ name: 'COUNTRY_NAME' })
	countryName!: string;

	@Expose({ name: 'COUNTRY_CODE' })
	countryCode!: string;

	@Expose({ name: 'TOWING_VEHICLE_ENCOUNTER_ID' })
	towingVehicleEncounterID!: string;

	@Expose({ name: 'TOWING_VEHICLE_IDENTIFIER' })
	towingVehicleIdentifier!: string;

	@Expose({ name: 'CHECKSITE_NAME' })
	checksiteName!: string;

	@Expose({ name: 'CHECKSITE_ROAD' })
	checksiteRoad!: string;

	@Expose({ name: 'CHECKSITE_TOWN' })
	checksiteTown!: string;

	@Expose({ name: 'CHECKSITE_COUNTY' })
	checksiteCounty!: string;

	@Expose({ name: 'JOURNEY_START' })
	journeyStart!: string;

	@Expose({ name: 'JOURNEY_END' })
	journeyEnd!: string;

	@Expose({ name: 'GOODS_CARRIED' })
	goodsCarried!: string;

	@Expose({ name: 'ENCOUNTER_TYPE' })
	encounterType!: string;

	@Expose({ name: 'ENCOUNTER_REASON' })
	encounterReason!: string;

	@Expose({ name: 'INSPECTION_LEVEL' })
	inspectionLevel!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ENCOUNTER_DATE' })
	encounterDate!: string;

	@Expose({ name: 'EXAM_OFFICER_TYPE' })
	examOfficerType!: string;

	@Expose({ name: 'PROHIBITION_NOTICE' })
	prohibitionNotice!: string;

	@Expose({ name: 'PROHIBITION_OUTSTANDING' })
	prohibitionOutstanding!: boolean;

	@Expose({ name: 'PERMITTED_WEIGHT1' })
	permittedWeight1!: number;

	@Expose({ name: 'PERMITTED_WEIGHT2' })
	permittedWeight2!: number;

	@Expose({ name: 'PERMITTED_WEIGHT3' })
	permittedWeight3!: number;

	@Expose({ name: 'ACTUAL_WEIGHT1' })
	actualWeight1!: number;

	@Expose({ name: 'ACTUAL_WEIGHT2' })
	actualWeight2!: number;

	@Expose({ name: 'ACTUAL_WEIGHT3' })
	actualWeight3!: number;

	@Expose({ name: 'EXCESS_WEIGHT1' })
	excessWeight1!: number;

	@Expose({ name: 'EXCESS_WEIGHT2' })
	excessWeight2!: number;

	@Expose({ name: 'EXCESS_WEIGHT3' })
	excessWeight3!: number;

	@Expose({ name: 'EXCESS_WEIGHT1_PERC' })
	excessWeight1Perc!: number;

	@Expose({ name: 'EXCESS_WEIGHT2_PERC' })
	excessWeight2Perc!: number;

	@Expose({ name: 'EXCESS_WEIGHT3_PERC' })
	excessWeight3Perc!: number;

	@Expose({ name: 'ACTUAL_TRAIN_WEIGHT' })
	actualTrainWeight!: number;

	@Expose({ name: 'PERMITTED_TRAIN_WEIGHT' })
	permittedTrainWeight!: number;

	@Expose({ name: 'EXCESS_TRAIN_WEIGHT' })
	excessTrainWeight!: number;

	@Expose({ name: 'EXCESS_TRAIN_WEIGHT_PERC' })
	excessTrainWeightPerc!: number;

	@Expose({ name: 'SEATING_CAPACITY' })
	seatingCapacity!: number;

	@Expose({ name: 'WEIGHT_PADS_MARKER' })
	weighPadUse!: boolean;

	// @Type(() => EncounterAxle)
	encounterAxles!: EncounterAxle[];

	// @Type(() => EncounterNotice)
	// @Transform((obj) => plainToInstance(EncounterNotice, obj))
	encounterNotices!: EncounterNotice[];

	// @Type(() => EncounterOffence)
	otherOffences!: EncounterOffence[];
}
