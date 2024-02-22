import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterOperator {
	@Expose({ name: 'GEN_NUM' })
	genNum!: string;

	@Expose({ name: 'NATIONALITY_CODE' })
	nationalityCode!: string;

	@Expose({ name: 'OPERATOR_NAME' })
	operatorName!: string;

	@Expose({ name: 'OPERATOR_ADDR_1' })
	addressLine1!: string;

	@Expose({ name: 'OPERATOR_ADDR_2' })
	addressLine2!: string;

	@Expose({ name: 'OPERATOR_ADDR_3' })
	addressLine3!: string;

	@Expose({ name: 'OPERATOR_ADDR_4' })
	addressLine4!: string;

	@Expose({ name: 'OPERATOR_POST_TOWN' })
	postTown!: string;

	@Expose({ name: 'OPERATOR_POST_CODE' })
	postcode!: string;

	@Expose({ name: 'OPERATOR_TRADING_AS' })
	tradingAs!: string;

	@Expose({ name: 'OPERATOR_LICENCE_NUMBER' })
	licenceNumber!: string;

	@Expose({ name: 'SERIAL_NUMBER' })
	licenceSerialNumber!: string;

	@Expose({ name: 'OPERATOR_EXPIRY_DATE' })
	licenceReviewDate!: string;
}
