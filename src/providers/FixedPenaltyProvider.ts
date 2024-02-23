import { Container, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { FixedPenaltyData } from '../domain/models/fixed-penalty/FixedPenaltyData';
import { UserName } from '../domain/models/fixed-penalty/UserName';

@Service()
export class FixedPenaltyProvider {
	get session() {
		return Container.get(SESSION);
	}

	async getFixedPenalties(identifier: string): Promise<FixedPenaltyData[]> {
		// @TODO: Role check - getAllowEncounter

		return this.session.selectList('getFixedPenalties', { identifier }, FixedPenaltyData);
	}

	async getUser(employeeID: string): Promise<string | undefined> {
		if (!employeeID) {
			return undefined;
		}

		const user = await this.session.selectOne('getUserName', { userId: employeeID }, UserName);

		return user?.username ?? undefined;
	}
}
