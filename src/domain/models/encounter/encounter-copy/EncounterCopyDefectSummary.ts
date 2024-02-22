import { Exclude, Expose } from 'class-transformer';

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
}
