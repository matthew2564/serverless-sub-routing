import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopySeverityBand {
	@Expose({ name: 'OSB_GEN_NUM' })
	generatedNumber!: string;

	@Expose({ name: 'OSB_CODE' })
	code!: string;

	@Expose({ name: 'OSB_EFFECTIVE_FROM' })
	effectiveFrom!: string;

	@Expose({ name: 'OSB_EFFECTIVE_TO' })
	effectiveTo!: string;

	@Expose({ name: 'OSB_PENALTY_POINTS' })
	penaltyPoints!: string;

	@Expose({ name: 'OSB_PENALTY_AMOUNT' })
	penaltyAmount!: string;

	@Expose({ name: 'OSB_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'OSB_DEPOSIT_AMOUNT' })
	depositAmount!: string;
}
