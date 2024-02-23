import { Exclude, Expose, Transform } from 'class-transformer';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Exclude()
export class EncounterCopyExemptionCondition {
	@Transform(({ value }) => (value ? DateTime.at(value).format('DD/MM/YYYY HH:mm:ss') : null))
	@Expose({ name: 'MEC_EXPIRY' })
	expiryDate!: string;

	@Expose({ name: 'MEC_NTY_CODE' })
	ntyCode!: string;

	@Expose({ name: 'MEC_LOCATION_FROM' })
	locationFrom!: string;

	@Expose({ name: 'MEC_LOCATION_TO' })
	locationTo!: string;

	@Expose({ name: 'MEC_NO_LOAD' })
	noLoad!: string;

	@Expose({ name: 'MEC_NO_TRAILER' })
	noTrailerTowed!: string;

	@Expose({ name: 'MEC_OTHER' })
	otherConditions!: string;

	@Expose({ name: 'MEC_RGD_TOW' })
	rgdTowBarIndictr!: string;

	@Expose({ name: 'MEC_SUS_FRT' })
	susTowFrtIndictr!: string;

	@Expose({ name: 'MEC_SUS_RR' })
	susTowRrIndctr!: string;

	@Expose({ name: 'MEC_SPEED_RESTICT' })
	maxSpeed!: string;

	@Expose({ name: 'MEC_SPEED_UNIT' })
	speedUnit!: string;

	@Expose({ name: 'MEC_VISIBILITY' })
	notInPoorVisibility!: string;
}
