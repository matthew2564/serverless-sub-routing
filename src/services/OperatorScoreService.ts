import { Inject, Service } from 'typedi';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';
import { OperatorScoreRequest } from '../domain/models/operator/OperatorScoreRequest';
import { OperatorScoreResponse } from '../domain/models/response/OperatorScoreResponse';
import { OperatorScoreProvider } from '../providers/OperatorScoreProvider';
import { OperatorScoreData } from '../domain/models/operator/OperatorScoreData';

@Service()
export class OperatorScoreService {
	constructor(@Inject() private operatorScoreProvider: OperatorScoreProvider) {}

	async getOperatorScore(operatorScoreRequest: OperatorScoreRequest): Promise<OperatorScoreResponse> {
		const operatorScores: OperatorScoreData[] =
			operatorScoreRequest?.operatorRequestList?.length > 0
				? await this.operatorScoreProvider.getOperatorScore(operatorScoreRequest)
				: [];

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm'),
			operatorScores,
			count: operatorScores.length,
		};
	}
}
