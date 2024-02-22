import { Inject, Service } from 'typedi';
import { FixedPenaltyProvider } from '../providers/FixedPenaltyProvider';
import { FixedPenaltyData } from '../domain/models/fixed-penalty/FixedPenaltyData';
import { FixedPenaltyResponse } from '../domain/models/response/FixedPenaltyResponse';
import { DateTime } from '@dvsa/cvs-microservice-common/classes/utils/date';

@Service()
export class FixedPenaltyService {
	constructor(@Inject() private fixedPenaltyProvider: FixedPenaltyProvider) {}

	async search(identifier: string): Promise<FixedPenaltyResponse> {
		const fixedPenalty: FixedPenaltyData[] = await this.fixedPenaltyProvider.getFixedPenalties(identifier);

		const fixedPenaltyDetails = await Promise.all(
			fixedPenalty.map(async (fixedPen) => {
				const user = await this.fixedPenaltyProvider.getUser(fixedPen.examiner);
				return {
					...fixedPen,
					examiner: user ?? '',
				} satisfies FixedPenaltyData;
			})
		);

		return {
			timeStamp: new DateTime().format('DD/MM/YYYY HH:mm:ss'),
			fixedPenaltyDetails,
		};
	}
}
