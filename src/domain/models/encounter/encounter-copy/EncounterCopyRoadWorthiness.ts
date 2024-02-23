import { Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

export class EncounterCopyRoadWorthiness {
	@Expose({ name: 'ERC_STATUS' })
	checkListStatus!: string;

	@Expose({ name: 'RCL_CHECK_ITEM' })
	checkListItem!: string;

	@Expose({ name: 'RCL_DESCRIPTION' })
	description!: string;

	@Transform(({ value }) => DateTime.at(value).format('DD/MM/YYYY'))
	@Expose({ name: 'RCL_EFFECTIVE_FROM' })
	effectiveFrom!: string;

	@Expose({ name: 'RCL_EFFECTIVE_TO' })
	effectiveTo!: string;

	@Expose({ name: 'RCL_DELETION_IND' })
	deletionMarker!: string;
}
