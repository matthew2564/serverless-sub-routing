import { Inject, Service } from 'typedi';
import { FixedPenaltyProvider } from '../providers/FixedPenaltyProvider';

@Service()
export class FixedPenaltyService {
	constructor(@Inject() private fixedPenaltyProvider: FixedPenaltyProvider) {}

	async search(identifier: string) {
		console.log(identifier);
	}
}
