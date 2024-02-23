import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { TeHoursResult } from './TeHoursResult';
import { Examiner } from './Examiner';
import { InitiatingReason } from './InitiatingReason';
import { VeVisitResult } from './VeVisitResult';
import { TeOtherResult } from './TeOtherResult';
import { OperatorVisitVehicleEncounter } from './OperatorVisitVehicleEncounter';
import { plainToInstanceOrNull } from '../../helpers/MapModelOrNull';

@Exclude()
export class OperatorVisitData {
	@Expose({ name: 'GENERATED_NUMBER' })
	generatedNumber!: string;

	@Expose({ name: 'FAS_STATUS' })
	fasStatus?: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ACTUAL_START_DATE' })
	actualStartDate!: Date;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ACTUAL_END_DATE' })
	actualEndDate!: Date;

	@Expose({ name: 'OPERATOR_LICENCE_NUMBER' })
	operatorLicenceNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid?: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'LAST_UPDATE' })
	lastUpdate!: Date;

	@Expose({ name: 'VISIT_TYPE' })
	visitType!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'INPUT_TIME' })
	inputTime!: Date;

	@Expose({ name: 'CHR_NUMBER' })
	chrNumber?: string;

	@Expose({ name: 'OPERATOR_NAME' })
	operatorName?: string;

	@Expose({ name: 'ADDR_1' })
	addressLine1?: string;

	@Expose({ name: 'ADDR_2' })
	addressLine2?: string;

	@Expose({ name: 'ADDR_3' })
	addressLine3?: string;

	@Expose({ name: 'ADDR_4' })
	addressLine4?: string;

	@Expose({ name: 'POSTCODE' })
	postcode?: string;

	@Expose({ name: 'POST_TOWN' })
	postTown?: string;

	@Expose({ name: 'DIGITAL_TACHO_QTY' })
	digitalTachoQty!: number;

	@Expose({ name: 'PAPER_TACHO_QTY' })
	paperTachoQty!: number;

	@Expose({ name: '' }) // Needed to map inner object
	@Transform(({ obj }) => plainToInstanceOrNull(VeVisitResult, obj), { toClassOnly: true })
	veVisitResult!: VeVisitResult;

	@Expose({ name: '' })
	@Transform(({ obj }) => plainToInstanceOrNull(InitiatingReason, obj), { toClassOnly: true })
	initiatingReason!: InitiatingReason;

	@Expose({ name: '' })
	@Transform(({ obj }) => plainToInstanceOrNull(TeHoursResult, obj), { toClassOnly: true })
	teHoursResult!: TeHoursResult;

	@Expose({ name: '' })
	@Transform(({ obj }) => plainToInstanceOrNull(TeOtherResult, obj), { toClassOnly: true })
	teOtherResult!: TeOtherResult;

	@Transform(({ obj }) => plainToInstanceOrNull(Examiner, obj), { toClassOnly: true })
	@Type(() => Examiner)
	examiner!: Examiner;

	vehicleEncounters!: OperatorVisitVehicleEncounter[];
}
