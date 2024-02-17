import { Inject, Service } from 'typedi';
import { OperatorScoreRequest } from '../domain/models/operator/OperatorScoreRequest';
import { QueryProvider } from './QueryProvider';
import path from 'path';
import { CONNECTION } from '../domain/di-tokens/di-tokens';
import { Connection } from 'mysql2';
import { OperatorScoreData } from '../domain/models/operator/OperatorScoreData';

@Service()
export class OperatorScoreProvider extends QueryProvider {
	private static readonly MAPPER_PATHS = [path.resolve(__dirname, './mappers/OperatorScoresMapper.xml')];

	constructor(@Inject(CONNECTION) connection: Connection) {
		super(connection, OperatorScoreProvider.MAPPER_PATHS);
	}

	async getOperatorScore(operatorRequest: OperatorScoreRequest): Promise<OperatorScoreData[]> {
		// @TODO: Role check - getAllowEncounter

		return this.queryAndMapTo(
			'getOperatorScores',
			{
				list: operatorRequest.operatorRequestList,
			},
			OperatorScoreData
		);
	}
}
