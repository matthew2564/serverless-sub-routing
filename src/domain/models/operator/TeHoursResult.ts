import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TeHoursResult {
	@Expose({ name: 'THR_CODE' })
	code!: string;

	@Expose({ name: 'THR_DESC' })
	description!: string;

	@Expose({ name: 'THR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'THR_SEQ_NUM' })
	sequenceNumber!: number;
}
