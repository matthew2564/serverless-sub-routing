import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OCRSSnapshot {
	@Expose({ name: 'SCORE_TYPE' })
	scoreType!: string;

	@Expose({ name: 'GRADE' })
	grade!: string;

	@Expose({ name: 'SCORE' })
	score!: number;
}
