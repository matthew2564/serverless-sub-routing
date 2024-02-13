import { Exclude, Expose, Transform, plainToInstance, ClassConstructor } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
class Examiner {
	@Expose({ name: 'FIRST_NAME' })
	firstName!: string;

	@Expose({ name: 'SURNAME' })
	surname!: string;

	@Expose({ name: 'USER_ID' })
	userId!: string;
}

@Exclude()
class InitiatingReason {
	@Expose({ name: 'IRE_GEN_NUM' })
	generatedNumber!: number;

	@Expose({ name: 'IRE_DESC' })
	description!: string;

	@Expose({ name: 'IRE_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'IRE_SEQ_NUM' })
	sequenceNumber!: number;

	@Expose({ name: 'IRE_USAGE' })
	usage!: string;
}

@Exclude()
class VeVisitResult {
	@Expose({ name: 'VVR_CODE' })
	code!: string;

	@Expose({ name: 'VVR_DESC' })
	description!: string;

	@Expose({ name: 'VVR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'VVR_SEQ_NUM' })
	sequenceNumber!: number;
}

@Exclude()
class TeHoursResult {
	@Expose({ name: 'THR_CODE' })
	code!: string;

	@Expose({ name: 'THR_DESC' })
	description!: string;

	@Expose({ name: 'THR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'THR_SEQ_NUM' })
	sequenceNumber!: number;
}

@Exclude()
class TeOtherResult {
	@Expose({ name: 'TOR_CODE' })
	code!: string;

	@Expose({ name: 'TOR_DESC' })
	description!: string;

	@Expose({ name: 'TOR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'TOR_SEQ_NUM' })
	sequenceNumber!: number;
}

@Exclude()
export class OperatorVisitMap {
	@Expose({ name: 'GENERATED_NUMBER' })
	generatedNumber!: string;

	@Expose({ name: 'FAS_STATUS' })
	fasStatus?: string; // Optional property

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ACTUAL_START_DATE' })
	actualStartDate!: Date;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'ACTUAL_END_DATE' })
	actualEndDate!: Date;

	@Expose({ name: 'OPERATOR_LICENCE_NUMBER' })
	operatorLicenceNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid?: string; // Optional property

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'LAST_UPDATE' })
	lastUpdate!: Date;

	@Expose({ name: 'VISIT_TYPE' })
	visitType!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'INPUT_TIME' })
	inputTime!: Date;

	@Expose({ name: 'CHR_NUMBER' })
	chrNumber?: string; // Optional property

	@Expose({ name: 'OPERATOR_NAME' })
	operatorName?: string; // Optional property

	@Expose({ name: 'ADDR_1' })
	addressLine1?: string; // Optional property

	@Expose({ name: 'ADDR_2' })
	addressLine2?: string; // Optional property

	@Expose({ name: 'ADDR_3' })
	addressLine3?: string; // Optional property

	@Expose({ name: 'ADDR_4' })
	addressLine4?: string; // Optional property

	@Expose({ name: 'POSTCODE' })
	postcode?: string; // Optional property

	@Expose({ name: 'POST_TOWN' })
	postTown?: string; // Optional property

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

	@Expose({ name: '' })
	@Transform(({ obj }) => plainToInstanceOrNull(Examiner, obj), { toClassOnly: true })
	examiner!: Examiner;
}

const isEmpty = (val: object) => Object.values(val).every((x) => !x);

const plainToInstanceOrNull = <T>(classObject: ClassConstructor<T>, data: unknown): T | null => {
	const result = plainToInstance(classObject, data) as object;
	return isEmpty(result) ? null : (result as T);
};
