import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TeOtherResult {
	@Expose({ name: 'TOR_CODE' })
	code!: string;

	@Expose({ name: 'TOR_DESC' })
	description!: string;

	@Expose({ name: 'TOR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'TOR_SEQ_NUM' })
	sequenceNumber!: number;
}
