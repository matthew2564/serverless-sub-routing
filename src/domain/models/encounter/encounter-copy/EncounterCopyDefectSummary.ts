import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyShortReason } from './EncounterCopyShortReason';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterCopyDefectSummary {
	@Expose({ name: 'VED_GEN_NUM' })
	encounterIdentifier!: string;

	@Expose({ name: 'VED_ACTION' })
	action!: string;

	@Expose({ name: 'VED_CAT_99' })
	cat99DefectCount!: string;

	@Expose({ name: 'VED_DEVIATION_COUNT' })
	deviationDefectCount!: string;

	@Expose({ name: 'VED_ENDORSEMENT' })
	endorsement!: string;

	@Expose({ name: 'VED_FIFTY_PERCENT' })
	fiftyPercentRuleMarker!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY HH:mm:ss'))
	@Expose({ name: 'VED_LAST_UPDATE' })
	lastUpdate!: string;

	@Expose({ name: 'VED_MAINT_FAILURE' })
	maintenanceFailureMarker!: string;

	@Expose({ name: 'VED_OVERALL_PROH' })
	overallProhibitionSeverity!: string;

	@Expose({ name: 'VED_SIG_REASON' })
	sgnfcanceReason!: string;

	@Expose({ name: 'VED_UPDATE_USERID' })
	updateUserId!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyShortReason, obj))
	@Expose({ name: '' })
	shortReason!: EncounterCopyShortReason;
}
