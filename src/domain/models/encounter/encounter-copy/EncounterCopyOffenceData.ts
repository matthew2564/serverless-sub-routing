import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyOffenceType } from './EncounterCopyOffenceType';
import { EncounterCopyOffenceSubType } from './EncounterCopyOffenceSubType';
import { EncounterCopyOffenceGroup } from './EncounterCopyOffenceGroup';
import { EncounterCopyOffence } from './EncounterCopyOffence';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterCopyOffenceData {
	@Expose({ name: 'OFF_DESCRIPTION' })
	offenceDescription!: string;

	@Expose({ name: 'OFF_NAME' })
	offenceCode!: string;

	@Expose({ name: 'DRIVER_NAME' })
	driver!: string;

	@Expose({ name: 'REFRD_FOR_INVESTIG' })
	additionalAction!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'OFFENCE_DATE' })
	date!: string;

	@Expose({ name: 'ADDITIONAL_TEXT' })
	notes!: string;

	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsable!: string;

	@Expose({ name: 'AOF_GENERATED_NUMBER' })
	aofGenNum!: string;

	@Expose({ name: 'AOF_EXEMPT' })
	historical!: string;

	@Expose({ name: 'OTHER_OPERATOR' })
	historicalOperator!: string;

	@Expose({ name: 'VRM' })
	relevantVrm!: string;

	@Expose({ name: 'OST_TEXT' })
	sanction!: string;

	@Expose({ name: 'HAZCHEM_RISK' })
	dgRisk!: string;

	@Expose({ name: 'HAZCHEM_REASON' })
	riskReason!: string;

	@Expose({ name: 'DRIVER_TYPE' })
	driverTypeValue!: string;

	@Expose({ name: 'OFFENCE_DATE' })
	dateTimeValue!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOffenceType, obj))
	@Expose({ name: '' })
	offenceType!: EncounterCopyOffenceType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOffenceSubType, obj))
	@Expose({ name: '' })
	offenceSubType!: EncounterCopyOffenceSubType;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOffenceGroup, obj))
	@Expose({ name: '' })
	offenceGroup!: EncounterCopyOffenceGroup;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyOffence, obj))
	@Expose({ name: '' })
	offence!: EncounterCopyOffence;
}
