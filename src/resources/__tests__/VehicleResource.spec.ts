import { Response } from 'express';
import { VehicleResource } from '../VehicleResource';
import { VehicleService } from '../../services/VehicleService';
import { VehicleData } from '../../models/VehicleDataModel';
import { Container } from 'typedi';
import { VehicleServiceMock } from '../../services/__mocks__/VehicleService.mock';
import { BadRequestError, NotFoundError } from 'routing-controllers';

describe('VehicleResource', () => {
	let vehicleResource: VehicleResource;
	let mockVehicleService: jest.Mocked<VehicleService>;
	let mockResponse: Partial<Response>;
	const mockIdentifier = 'TEST123';
	const mockVehicleData = {
		make: 'Ford',
	} as VehicleData;

	beforeEach(() => {
		// set the mock implementation
		Container.set(VehicleService, new VehicleServiceMock());

		// get the mock service from the container
		mockVehicleService = Container.get(VehicleService) as jest.Mocked<VehicleService>;

		// inject the mock service into the resource
		vehicleResource = new VehicleResource(mockVehicleService);

		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
	});

	it('should return 200 and vehicle data when vehicle is found', async () => {
		mockVehicleService.searchByVrm.mockResolvedValue(mockVehicleData);

		await vehicleResource.getVehicleByVrm({ identifier: mockIdentifier }, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(200);
		expect(mockResponse.json).toHaveBeenCalledWith(
			expect.objectContaining({
				vehicle: mockVehicleData,
			})
		);
	});

	it('should return 400 for a bad request response', async () => {
		mockVehicleService.searchByVrm.mockRejectedValue(new BadRequestError('Bad req err'));

		await vehicleResource.getVehicleByVrm({ identifier: mockIdentifier }, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Bad req err' });
	});

	it('should return 404 when no vehicle is found', async () => {
		mockVehicleService.searchByVrm.mockRejectedValue(new NotFoundError('Not found err'));

		await vehicleResource.getVehicleByVrm({ identifier: mockIdentifier }, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(404);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Not found err' });
	});

	it('should handle errors and return 500', async () => {
		mockVehicleService.searchByVrm.mockRejectedValue(new Error('Test Error'));

		await vehicleResource.getVehicleByVrm({ identifier: mockIdentifier }, mockResponse as Response);

		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.send).toHaveBeenCalled();
	});
});
