import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterSanction {
	@Expose({ name: 'FK_NTY_CODE' })
	fkNtyCode!: string;

	@Expose({ name: 'CLEARANCE_DATE' })
	clearanceDate!: string;

	@Expose({ name: 'NOTICE_STATUS' })
	noticeStatus!: string;

	@Expose({ name: 'IN_FORCE_DATE' })
	inForceDate!: string;
}
