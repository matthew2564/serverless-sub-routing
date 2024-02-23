import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterCopyOffenceCode {
	@Expose({ name: 'OFF_CODE' })
	code!: string;

	@Expose({ name: 'OFF_VERSION' })
	version!: string;

	@Expose({ name: 'OFF_UK_MARKER' })
	ukMarker!: string;

	@Expose({ name: 'OFF_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'OFF_SEQ_NUM' })
	sequenceNumber!: string;

	@Expose({ name: 'OFF_NAME' })
	name!: string;

	@Expose({ name: 'DESCRIPTION' })
	description!: string;

	@Expose({ name: 'OFF_OST_CODE' })
	ostCode!: string;

	@Expose({ name: 'OFF_OFG_CODE' })
	ofgCode!: string;

	@Transform(({ value }) => (value ? DateTime.at(value).format('DD/MM/YYYY HH:mm:ss') : null))
	@Expose({ name: 'OFF_EFFECT_FROM' })
	effectiveFromDate!: string;

	@Expose({ name: 'OFF_EFFECT_TO' })
	effectiveToDate!: string;

	@Expose({ name: 'OFF_OTY_CODE' })
	otyCode!: string;

	@Expose({ name: 'OFF_OSB_CODE' })
	osbCode!: string;

	@Expose({ name: 'OFF_HAZ_RISK' })
	hazchemRisk!: string;

	@Expose({ name: 'OFF_HAZ_REASON' })
	hazchemReason!: string;

	@Expose({ name: 'OFF_END_FLAG' })
	endorsableFlag!: string;

	@Expose({ name: 'OFF_FK_OGP_CODE' })
	fkOgpCode!: string;

	@Expose({ name: 'OFF_FK_OGP_VERSION' })
	fkOgpVersion!: string;

	@Expose({ name: 'OFF_DESC_WELSH' })
	descriptionWelsh!: string;
}
