import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyShortReason {
	@Expose({ name: 'MCR_GEN_NUM' })
	generatedNumber!: string;

	@Expose({ name: 'MCR_FULL_REASON' })
	fullReason!: string;

	@Expose({ name: 'MCR_SHORT_REASON' })
	shortReason!: string;

	@Expose({ name: 'MCR_EFFECTIVE_FROM' })
	effectiveFrom!: string;

	@Expose({ name: 'MCR_EFFECTIVE_TO' })
	effectiveTo!: string;
}
