import { Service } from 'typedi';

@Service()
export class RequiredStandardsProviderMock {
	findByEUVehicleCategory = jest.fn();
	private static get tableName() {
		return jest.fn();
	}
}
