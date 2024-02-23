import { Exclude, Expose, Transform } from 'class-transformer';
import { EncounterCopyHazchemContainerType } from './EncounterCopyHazchemContainerType';
import { plainToInstanceOrNull } from '../../../helpers/MapModelOrNull';

@Exclude()
export class EncounterDangerousGoods {
	@Expose({ name: 'DANGER_TYPE' })
	type!: string;

	@Transform(({ obj }) => plainToInstanceOrNull(EncounterCopyHazchemContainerType, obj))
	@Expose({ name: '' })
	modeOfTransport!: EncounterCopyHazchemContainerType;

	@Expose({ name: 'UN_NUMBER' })
	unNumber!: string;

	@Expose({ name: 'CATEGORY_OF_RISK' })
	categoryOfRisk!: string;

	@Expose({ name: 'TOT_QTY_DANGEROUS_GOODS' })
	quantityOfGoods!: string;

	@Expose({ name: 'LIMIT_EXCEEDED' })
	limitExceeded!: string;

	@Expose({ name: 'CONSIGNEE_TRADING_AS' })
	consignee!: string;

	@Expose({ name: 'CONSIGNEE_POSTCODE' })
	consigneePostcode!: string;

	@Expose({ name: 'CONSIGNEE_ADDR_1' })
	consigneeAddressLine1!: string;

	@Expose({ name: 'CONSIGNEE_ADDR_2' })
	consigneeAddressLine2!: string;

	@Expose({ name: 'CONSIGNEE_ADDR_3' })
	consigneeAddressLine3!: string;

	@Expose({ name: 'CONSIGNEE_ADDR_4' })
	consigneeAddressLine4!: string;

	@Expose({ name: 'CONSIGNEE_POST_TOWN' })
	consigneePostTown!: string;

	@Expose({ name: 'CONSIGNOR_TRADING_AS' })
	consignor!: string;

	@Expose({ name: 'CONSIGNOR_POSTCODE' })
	consignorPostcode!: string;

	@Expose({ name: 'CONSIGNOR_ADDR_1' })
	consignorAddressLine1!: string;

	@Expose({ name: 'CONSIGNOR_ADDR_2' })
	consignorAddressLine2!: string;

	@Expose({ name: 'CONSIGNOR_ADDR_3' })
	consignorAddressLine3!: string;

	@Expose({ name: 'CONSIGNOR_ADDR_4' })
	consignorAddressLine4!: string;

	@Expose({ name: 'CONSIGNOR_POST_TOWN' })
	consignorPostTown!: string;

	@Expose({ name: 'MISC_REMARKS' })
	remarks!: string;
}
