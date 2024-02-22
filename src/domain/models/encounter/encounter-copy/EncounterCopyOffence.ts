import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOffence {
	@Expose({ name: 'OFF_NAME' })
	offence!: string;

	@Expose({ name: 'HAZCHEM_REASON' })
	hazchemReason!: string;

	@Expose({ name: 'FK_OFF_UK_MARKER' })
	ukMarker!: string;

	@Expose({ name: 'OSU_DESCRIPTION' })
	offenceSubType!: string;

	@Expose({ name: 'OTY_DESCRIPTION' })
	offenceType!: string;

	@Expose({ name: 'OGP_DESCRIPTION' })
	offenceGroup!: string;

	@Expose({ name: 'OFF_VERSION' })
	version!: string;

	@Expose({ name: 'OTY_CODE' })
	offenceTypeCode!: string;

	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsableFlag!: string;

	@Expose({ name: 'OTY_VERSION' })
	offenceTypeVersion!: string;

	@Expose({ name: 'OGP_CODE' })
	offenceGroupCode!: string;

	@Expose({ name: 'OSU_CODE' })
	offenceSubTypeCode!: string;

	@Expose({ name: 'OST_GEN_NUM' })
	stGeneratedNumber!: string;

	@Expose({ name: 'HAZCHEM_RISK' })
	hazchemRisk!: string;

	@Expose({ name: 'PENALTY_AMOUNT' })
	penaltyAmount!: string;

	@Expose({ name: 'OGP_VERSION' })
	offenceGroupVersion!: string;

	@Expose({ name: 'OFF_CODE' })
	offenceCode!: string;

	@Expose({ name: 'OSU_VERSION' })
	offenceSubTypeVersion!: string;

	@Expose({ name: 'OFF_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'OFF_DELETION_IND' })
	deletionMarker!: string;
}
