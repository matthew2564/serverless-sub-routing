import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyNoticeTypeDetail {
	@Expose({ name: 'NTD_NTY_CODE' })
	ntyCode!: string;

	@Expose({ name: 'NTD_VERSION' })
	version!: string;

	@Expose({ name: 'NTD_DELETION_IND' })
	deletionMarker!: string;

	@Expose({ name: 'NTD_ACT_DETAIL' })
	actDetail!: string;

	@Expose({ name: 'NTD_MSG1' })
	actMsg1!: string;

	@Expose({ name: 'NTD_MSG2' })
	actMsg2!: string;

	@Expose({ name: 'NTD_MSG3' })
	actMsg3!: string;
}
