import { OperatorScoreRequest } from '../models/operator/OperatorScoreRequest';

export function operatorScoresPayloadValidator(data: OperatorScoreRequest): { valid: boolean; error?: string } {
	// Early return if the operator request list is undefined or empty
	if (!data.operatorRequestList || data.operatorRequestList.length === 0) {
		return { valid: true };
	}

	const hasInvalidOperatorIdentifier = data.operatorRequestList.some(
		({ operatorIdentifier }) => operatorIdentifier.length > 15 || !/^[A-Za-z0-9]*$/.test(operatorIdentifier)
	);

	return hasInvalidOperatorIdentifier
		? { valid: false, error: 'Operator identifier does not meet requirements' }
		: { valid: true };
}
