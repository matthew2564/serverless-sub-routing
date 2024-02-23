import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyOffenceNoticeTypeXref {
	@Expose({ name: 'ONTX_GENERATED_NUMBER' })
	generatedNumber!: string;

	@Expose({ name: 'ONTX_OFF_CODE' })
	offCode!: string;

	@Expose({ name: 'ONTX_FK_NTY_CODE' })
	fkNtyCode!: string;

	@Expose({ name: 'ONTX_DELETION_MARKER' })
	deletionMarker!: string;
}
