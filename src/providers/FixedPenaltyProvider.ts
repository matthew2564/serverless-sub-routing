import { Inject, Service } from 'typedi';
import { SESSION } from '../domain/di-tokens/di-tokens';
import { default as Session } from 'mybatis-mapper/create-session';

@Service()
export class FixedPenaltyProvider {
	constructor(@Inject(SESSION) private session: Session) {}

	async getFixedPenalties(identifier: string) {
		// @TODO: Role check - getAllowEncounter

		return this.session.selectList('getFixedPenalties', { identifier }, class X {});
	}
}
