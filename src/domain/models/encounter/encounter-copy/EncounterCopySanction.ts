import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopySanction {
	@Expose({ name: 'OST_GEN_NUM' })
	generatedNumber!: string;

	@Expose({ name: 'OST_CODE' })
	code!: string;

	@Expose({ name: 'OST_TEXT' })
	text!: string;

	@Expose({ name: 'OST_DELETION_IND' })
	deletionMarker!: string;
}
