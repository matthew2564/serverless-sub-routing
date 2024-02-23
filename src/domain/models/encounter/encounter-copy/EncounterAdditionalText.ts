import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterAdditionalText {
	@Expose({ name: 'MET_TEXT' })
	text!: string;

	@Expose({ name: 'ETT_DESCIPTION' })
	description!: string;

	@Expose({ name: 'ETT_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'ETT_WITHIN' })
	withinEncounter!: string;

	@Expose({ name: 'ETT_SORT_SEQ' })
	sortSequence!: string;

	@Expose({ name: 'ETT_CODE' })
	code!: string;

	@Expose({ name: 'ETT_NAME' })
	name!: string;
}
