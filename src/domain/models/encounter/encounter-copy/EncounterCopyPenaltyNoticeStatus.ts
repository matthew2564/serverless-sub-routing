import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyPenaltyNoticeStatus {
	@Expose({ name: 'PNS_CODE' })
	code!: string;

	@Expose({ name: 'PNS_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'PNS_SEQ_NUM' })
	sequenceNumber!: string;

	@Expose({ name: 'PNS_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'PNS_USAGE_IND' })
	usageIndicator!: string;

	@Expose({ name: 'PNS_BFPN01_FLAG' })
	bfpnp01Flag!: string;

	@Expose({ name: 'PNS_FFPNO1_FLAG' })
	ffpn01Flag!: string;

	@Expose({ name: 'PNS_FDEN01_FLAG' })
	fden01Flag!: string;

	@Expose({ name: 'PNS_END_FLAG' })
	endorsableFlag!: string;
}
