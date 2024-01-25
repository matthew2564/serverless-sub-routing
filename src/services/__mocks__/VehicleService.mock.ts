import { Service } from 'typedi';

@Service()
export class VehicleServiceMock {
	searchByVrm = jest.fn();
}
