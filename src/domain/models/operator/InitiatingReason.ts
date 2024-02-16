import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class InitiatingReason {
	@Expose({ name: 'IRE_GEN_NUM' })
	generatedNumber!: number;

	@Expose({ name: 'IRE_DESC' })
	description!: string;

	@Expose({ name: 'IRE_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'IRE_SEQ_NUM' })
	sequenceNumber!: number;

	@Expose({ name: 'IRE_USAGE' })
	usage!: string;
}
