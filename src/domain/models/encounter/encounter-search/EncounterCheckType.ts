import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCheckType {
	@Expose({ name: 'CHECK_TYPE' })
	checkTypeCode!: string;

	@Expose({ name: 'CHECK_TYPE_DESCRIPTION' })
	checkTypeDescription!: string;
}
