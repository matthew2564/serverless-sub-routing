import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOffenceGroup {
	@Expose({ name: 'OSU_CODE' })
	offenceSubTypeCode!: string;

	@Expose({ name: 'OSU_DESCRIPTION' })
	offenceSubType!: string;

	@Expose({ name: 'OGP_CODE' })
	offenceGroupCode!: string;

	@Expose({ name: 'OGP_VERSION' })
	offenceGroupVersion!: string;

	@Expose({ name: 'OGP_DESCRIPTION' })
	offenceGroup!: string;

	@Expose({ name: 'OTY_CODE' })
	offenceTypeCode!: string;

	@Expose({ name: 'FK_OFF_UK_MARKER' })
	ukMarker!: string;

	@Expose({ name: 'OTY_VERSION' })
	offenceTypeVersion!: string;

	@Expose({ name: 'OTY_DESCRIPTION' })
	offenceType!: string;

	@Expose({ name: 'OSU_VERSION' })
	offenceSubTypeVersion!: string;

	@Expose({ name: 'OGP_DELETION_IND' })
	deletionMarker!: string;
}
