import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOffenceType {
	@Expose({ name: 'FK_OFF_UK_MARKER' })
	ukMarker!: string;

	@Expose({ name: 'OTY_VERSION' })
	offenceTypeVersion!: string;

	@Expose({ name: 'OTY_CODE' })
	offenceTypeCode!: string;

	@Expose({ name: 'OTY_DESCRIPTION' })
	offenceType!: string;

	@Expose({ name: 'OTY_DELETION_IND' })
	deletionMarker!: string;
}
