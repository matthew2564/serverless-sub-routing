import { Inject, Service } from 'typedi';
import { default as Session } from 'mybatis-mapper/create-session';
import { OperatorScoreRequest } from '../domain/models/operator/OperatorScoreRequest';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { OperatorScoreData } from '../domain/models/operator/OperatorScoreData';

@Service()
export class OperatorScoreProvider {
	constructor(@Inject(SESSION) private session: Session) {}

	async getOperatorScore(operatorRequest: OperatorScoreRequest): Promise<OperatorScoreData[]> {
		// @TODO: Role check - getAllowEncounter

		return this.session.selectList(
			'getOperatorScores',
			{ list: operatorRequest.operatorRequestList },
			OperatorScoreData
		);
	}
}
