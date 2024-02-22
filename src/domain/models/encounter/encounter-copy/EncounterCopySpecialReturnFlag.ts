import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopySpecialReturnFlag {
	@Expose({ name: 'SRF_CODE_NUMBER' })
	codeNumber!: string;

	@Expose({ name: 'SRF_CODE_DESCRIPTION' })
	codeDescription!: string;
}
