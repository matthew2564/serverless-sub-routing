import { Expose, Transform } from 'class-transformer';

export class OperatorScoreData {
	@Expose({ name: 'operatorIdentifier' })
	operatorIdentifier!: string;

	@Expose({ name: 'nationality' })
	nationality!: string;

	@Expose({ name: 'scoreType' })
	scoreType!: string;

	// number -> string to drop preceding zeros
	@Transform(({ value }) => (typeof value === 'string' ? Number(value).toString() : null))
	@Expose({ name: 'ocrsNumericBand' })
	ocrsNumericBand!: string;

	@Expose({ name: 'ocrsBand' })
	ocrsBand!: string;
}
