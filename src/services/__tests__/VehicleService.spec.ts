import { Container } from 'typedi';
import { VehicleProvider } from '../../providers/VehicleProvider';
import { VehicleService } from '../VehicleService';
import { VehicleData } from '../../models/VehicleDataModel';
import { VehicleProviderMock } from '../../providers/__mocks__/VehicleProvider.mock';
import { AxiosResponse } from 'axios';

jest.mock('../../providers/VehicleProvider');

describe('VehicleService', () => {
	let vehicleService: VehicleService;
	let mockVehicleProvider: jest.Mocked<VehicleProvider>;

	beforeEach(() => {
		// set the mock implementation
		Container.set(VehicleProvider, new VehicleProviderMock());

		// get the mock provider from the container
		mockVehicleProvider = Container.get(VehicleProvider) as jest.Mocked<VehicleProvider>;

		// inject the mock provider into the service
		vehicleService = new VehicleService(mockVehicleProvider);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('searchByVrm', () => {
		it('should not throw on success', async () => {
			mockVehicleProvider.getVehicleByVrm.mockResolvedValue({
				data: new VehicleData(),
			} as AxiosResponse<VehicleData>);

			await expect(vehicleService.searchByVrm('12345')).resolves.not.toThrow();
		});
	});
});
