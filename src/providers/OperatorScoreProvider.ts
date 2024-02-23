import { Container, Service } from 'typedi';
import { OperatorScoreRequest } from '../domain/models/operator/OperatorScoreRequest';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { OperatorScoreData } from '../domain/models/operator/OperatorScoreData';
import { OperatorIdData } from '../domain/models/operator/OperatorIdData';

@Service()
export class OperatorScoreProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getOperatorScore(operatorRequest: OperatorScoreRequest): Promise<OperatorScoreData[]> {
		// @TODO: Role check - getAllowEncounter

		const list: OperatorIdData[] = operatorRequest.operatorRequestList.map((operatorIdentifier) => ({
			operatorIdentifier,
		}));

		return this.session.selectList('getOperatorScores', { list }, OperatorScoreData);
	}
}
