import { Inject, Service } from 'typedi';
import {
	DefectGETRequiredStandards,
	InspectionType,
	RequiredStandard,
	RequiredStandardTaxonomySection,
} from '@dvsa/cvs-type-definitions/types/required-standards/defects/get';
import { EUVehicleCategory } from '@dvsa/cvs-type-definitions/types/required-standards/defects/enums/euVehicleCategory.enum';
import { getEnumKeyByValue } from '../domain/helpers/GetEnumKeyByValue';
import { BadRequestError } from 'routing-controllers';
import { ITaxonomySectionRequiredStandards } from '../domain/models/defects/ITaxonomySectionRequiredStandards';
import { IRequiredStandard } from '../domain/models/defects/RequiredStandard';
import { RequiredStandardsProvider } from '../providers/RequiredStandardsProvider';

@Service()
export class RequiredStandardsService {
	constructor(@Inject() private requiredStandardsProvider: RequiredStandardsProvider) {}

	async getByEUVehicleCategory(euVehicleCategory: string): Promise<DefectGETRequiredStandards> {
		// lookup the `euVehicleCategory` inside the enum to check validity
		const categoryEnumKey: keyof typeof EUVehicleCategory | null = getEnumKeyByValue(
			EUVehicleCategory,
			euVehicleCategory
		);

		// if lookup not successful, throw bad request error
		if (!categoryEnumKey) {
			throw new BadRequestError(`Invalid EU Vehicle Category provided - ${euVehicleCategory}`);
		}

		// get required standards using valid `euVehicleCategory`
		const requiredStandards = await this.requiredStandardsProvider.findByEUVehicleCategory(euVehicleCategory);

		return {
			euVehicleCategories: [EUVehicleCategory[categoryEnumKey]],
			basic: this.formatSections(requiredStandards, ({ basicInspection }) => basicInspection),
			normal: this.formatSections(
				requiredStandards,
				({ normalInspection, basicInspection }) => normalInspection || (!normalInspection && !basicInspection)
			),
		};
	}

	private formatSections(
		results: ITaxonomySectionRequiredStandards[],
		filterExpression: (x: IRequiredStandard) => boolean
	): RequiredStandardTaxonomySection[] {
		return results.flatMap(({ requiredStandards, sectionDescription, sectionNumber }) => {
			const standards = requiredStandards
				// filter based on passed expression
				.filter(filterExpression)
				// map data into required format
				.map(this.mapRequiredStandard);

			// if no standards found, return empty array
			if (standards.length === 0) return [];

			// construct the section object
			return {
				sectionNumber,
				sectionDescription,
				requiredStandards: standards,
			};
		});
	}

	private mapRequiredStandard({
		rsNumber,
		requiredStandard,
		refCalculation,
		additionalInfo,
		basicInspection,
		normalInspection,
	}: IRequiredStandard): RequiredStandard {
		return {
			rsNumber: parseInt(rsNumber, 10),
			requiredStandard,
			refCalculation,
			additionalInfo,
			inspectionTypes: [
				...(basicInspection ? ['basic' as InspectionType] : []),
				...(normalInspection ? ['normal' as InspectionType] : []),
			],
		};
	}
}
