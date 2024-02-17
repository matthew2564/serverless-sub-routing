import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OperatorScoreData {
	@Expose({ name: 'OPERATORIDENTIFIER' })
	operatorIdentifier!: string;

	@Expose({ name: 'NATIONALITY' })
	nationality!: string;

	@Expose({ name: 'SCORETYPE' })
	scoreType!: string;

	@Expose({ name: 'OCRSNUMERICBAND' })
	ocrsNumericBand!: number;

	@Expose({ name: 'OCRSBAND' })
	ocrsBand!: string;
}
