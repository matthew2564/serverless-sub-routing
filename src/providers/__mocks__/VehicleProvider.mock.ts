import { Service } from 'typedi';

@Service()
export class VehicleProviderMock {
	getVehicleByVrm = jest.fn();
}
