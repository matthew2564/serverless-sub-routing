import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ActualPayment {
	@Expose({ name: 'RECORDER' })
	recorder!: string;

	@Expose({ name: 'PAYMENT_DATE' })
	paymentDate!: string;

	@Expose({ name: 'AMOUNT' })
	amount!: string;

	@Expose({ name: 'PAYMENT_METHOD' })
	paymentMethod!: string;

	@Expose({ name: 'SORT_CODE' })
	sortCode!: string;

	@Expose({ name: 'CHEQUE_NUMBER' })
	chequeNumber!: string;

	@Expose({ name: 'CLIENT_GUID' })
	clientGuid!: string;

	@Expose({ name: 'CARD_PAYMENT_REF' })
	cardPaymentRef!: string;
}
