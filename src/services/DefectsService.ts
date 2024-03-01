import { Inject, Service } from 'typedi';
import { DefectsProvider } from '../providers/DefectsProvider';
import { NotFoundError } from 'routing-controllers';
import { Defect } from '../domain/models/defects/Defect.model';

@Service()
export class DefectsService {
	constructor(@Inject() private defectsProvider: DefectsProvider) {}

	async getDefectList(): Promise<Omit<Defect, 'id'>[]> {
		const defects = await this.defectsProvider.getAllDefects();

		if (defects?.length === 0) {
			throw new NotFoundError('No defects found');
		}

		return (
			defects
				// sort by `imNumber` field in ascending order
				.sort((a, b) => a.imNumber - b.imNumber)
				// remove `id` field from each object
				.map(({ id, ...defect }) => defect)
		);
	}
}
