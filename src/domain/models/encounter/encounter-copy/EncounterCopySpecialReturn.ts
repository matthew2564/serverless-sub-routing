import { Exclude, Expose } from 'class-transformer';
import { EncounterCopySpecialReturnFlag } from './EncounterCopySpecialReturnFlag';

@Exclude()
export class EncounterCopySpecialReturn {
	@Expose({ name: 'SRX_EXERCISE_CODE' })
	exerciseCode!: string;

	@Expose({ name: 'SRE_START_DATE' })
	exerciseStartDate!: string;

	@Expose({ name: 'SRE_END_DATE' })
	exerciseEndDate!: string;

	@Expose({ name: 'SRE_RETURN_FLAG' })
	returnCodeFlag!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_1' })
	specialReturnCode1!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_2' })
	specialReturnCode2!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_3' })
	specialReturnCode3!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_4' })
	specialReturnCode4!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_5' })
	specialReturnCode5!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_6' })
	specialReturnCode6!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_7' })
	specialReturnCode7!: string;

	@Expose({ name: 'SPECL_RETURN_CODE_8' })
	specialReturnCode8!: string;

	specialReturnFlag!: EncounterCopySpecialReturnFlag[];
}
