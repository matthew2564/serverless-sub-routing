import { OperatorVisitRequest } from '../models/operator/OperatorVisitRequest';

export function operatorVisitPayloadValidator(data: OperatorVisitRequest): { valid: boolean; error?: string } {
	const neitherGuidOrLicenceNumber = data.clientGuid === null && data.operatorLicenceNumber === null;

	const bothGuidAndLicenceNumber = !!(data.clientGuid && data.operatorLicenceNumber);

	const guidAndOneOtherOptional = data.clientGuid && (data.fromDate || data.toDate || data.visitType);

	const opLicenceNumberAndMissingDate = !!(data.operatorLicenceNumber && (!data.fromDate || !data.toDate));

	if (
		neitherGuidOrLicenceNumber ||
		bothGuidAndLicenceNumber ||
		guidAndOneOtherOptional ||
		opLicenceNumberAndMissingDate
	) {
		return {
			valid: false,
			error: 'Operator Visit Request does not meet requirements - mandatory fields are missing',
		};
	}

	return { valid: true };
}
