import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ObservedIDs {
	@Expose({ name: 'FK_VEN_GENERATED_NUMBER' })
	enforcementId!: string;

	@Expose({ name: 'GENERATED_NUMBER' })
	generatedNo!: string;
}
