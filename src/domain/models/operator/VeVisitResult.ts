import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class VeVisitResult {
	@Expose({ name: 'VVR_CODE' })
	code!: string;

	@Expose({ name: 'VVR_DESC' })
	description!: string;

	@Expose({ name: 'VVR_DEL_IND' })
	deletionMarker!: string;

	@Expose({ name: 'VVR_SEQ_NUM' })
	sequenceNumber!: number;
}
