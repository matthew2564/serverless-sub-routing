import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { OriginalProhibitionRequest } from '../domain/models/prohibition/OriginalProhibitionRequest';
import { OutstandingProhibitionData } from '../domain/models/prohibition/OutstandingProhibitionData';

@Service()
export class OriginalProhibitionProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getIssueDate(originalProhibitionRequest: OriginalProhibitionRequest): Promise<string | null> {
		const data = await this.session.selectOne(
			'getIssueDate',
			{ ...originalProhibitionRequest },
			OutstandingProhibitionData
		);
		return data?.issueDate ?? null;
	}
}
