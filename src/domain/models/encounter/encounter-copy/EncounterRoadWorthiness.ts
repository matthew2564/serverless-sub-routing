import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterRoadWorthiness {
	@Expose({ name: 'ERC_STATUS' })
	checkListStatus!: string;

	@Expose({ name: 'RCL_CHECK_ITEM' })
	checkListItem!: string;

	@Expose({ name: 'RCL_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'RCL_EFFECTIVE_FROM' })
	effectiveFrom!: string;

	@Expose({ name: 'RCL_EFFECTIVE_TO' })
	effectiveTo!: string;

	@Expose({ name: 'RCL_DELETION_IND' })
	deletionMarker!: string;
}
