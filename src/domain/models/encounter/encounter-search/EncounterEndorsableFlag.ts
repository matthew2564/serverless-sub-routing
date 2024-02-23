import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterEndorsableFlag {
	@Expose({ name: 'ENDORSABLE_FLAG' })
	endorsableFlag!: string;
}
