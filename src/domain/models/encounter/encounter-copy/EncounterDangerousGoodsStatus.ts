import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterDangerousGoodsStatus {
	@Expose({ name: 'FK_HCH_GENERATED_NUMBER' })
	fkHchGeneratedNumber!: number;

	@Expose({ name: 'STATUS_NAME' })
	statusName!: string;
}
