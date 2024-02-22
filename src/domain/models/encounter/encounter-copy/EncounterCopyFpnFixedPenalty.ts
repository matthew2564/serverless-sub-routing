import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class EncounterCopyFpnFixedPenalty {
	@Expose({ name: 'REFERENCE_NUMBER' })
	referenceNumber!: string;

	@Expose({ name: 'STATUS' })
	status!: string;

	@Expose({ name: 'AMOUNT_DUE' })
	amountDue!: string;

	@Expose({ name: 'ISSUE_DATE' })
	issueDate!: string;

	@Expose({ name: 'ISSUE_TIME' })
	issueTime!: string;
}
