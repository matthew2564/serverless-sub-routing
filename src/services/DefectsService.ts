import { Inject, Service } from 'typedi';
import { DefectsProvider } from '../providers/DefectsProvider';
import { NotFoundError } from 'routing-controllers';
import { DefectDetailsSchema } from '@dvsa/cvs-type-definitions/types/v1/defect-details';

@Service()
export class DefectsService {
	constructor(@Inject() private defectsProvider: DefectsProvider) {}

	async getDefectList(): Promise<DefectDetailsSchema[]> {
		const defects = await this.defectsProvider.getAllDefects();

		// @TODO: This is not the correct status code IMO.
		// This could be a 204, but we would need to consider FE implications.
		// This might also warrant being a 200 with an empty array.
		// If this is removed/changed, remember to re-evaluate the `NotFoundError` check inside the resource.
		if (defects?.length === 0) {
			throw new NotFoundError('No defects found');
		}

		return (
			defects
				// sort by `imNumber` field in ascending order
				.sort((a, b) => a.imNumber - b.imNumber)
				// remove `id` field from each object - the ignore is intentional
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.map(({ id: _id, ...defect }) => defect)
		);
	}
}
