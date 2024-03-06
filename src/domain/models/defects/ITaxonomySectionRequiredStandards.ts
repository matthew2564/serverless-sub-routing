import { IRequiredStandard } from './RequiredStandard';

export interface ITaxonomySectionRequiredStandards {
	euVehicleCategory: string;
	sectionNumber: string;
	sectionDescription: string;
	requiredStandards: IRequiredStandard[];
}
