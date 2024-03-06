import { Service } from 'typedi';

@Service()
export class RequiredStandardsServiceMock {
	getByEUVehicleCategory = jest.fn();
	private formatSections = jest.fn();
	private mapRequiredStandard = jest.fn();
}
