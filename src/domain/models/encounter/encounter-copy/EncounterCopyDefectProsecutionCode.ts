import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyDefectProsecutionCode {
	@Expose({ name: 'DPR_CODE' })
	code!: string;

	@Expose({ name: 'DPR_PROS_COND' })
	prosecutionConsidered!: string;

	@Expose({ name: 'DPR_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'DPR_DESCRIPTION' })
	description!: string;

	@Expose({ name: 'DPR_SEQ_NUM' })
	sequenceNumber!: string;
}
