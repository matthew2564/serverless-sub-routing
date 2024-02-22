import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOffenceSubType {
	@Expose({ name: 'OSU_CODE' })
	offenceSubTypeCode!: string;

	@Expose({ name: 'OSU_DESCRIPTION' })
	offenceSubType!: string;

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

	@Expose({ name: 'OSU_DELETION_IND' })
	deletionMarker!: string;
}
