import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterTrailerCount {
	@Expose({ name: 'COUNT' })
	trailerCount!: number;
}
