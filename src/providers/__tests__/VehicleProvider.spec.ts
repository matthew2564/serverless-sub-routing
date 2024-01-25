import axios from 'axios';
import { VehicleProvider } from '../VehicleProvider';
import { VehicleData } from '../../models/VehicleDataModel';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { SecretsManager } from '@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client';

// Mock the entire axios module
jest.mock('axios');

// Mock SecretsManager
jest.mock('@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client', () => ({
	SecretsManager: {
		get: jest.fn(),
	},
}));

// Mock EnvironmentVariables
jest.mock('@dvsa/cvs-microservice-common/classes/misc/env-vars', () => ({
	EnvironmentVariables: {
		get: jest.fn(),
	},
}));

describe('VehicleProvider', () => {
	let vehicleProvider: VehicleProvider;
	let mockResponse: VehicleData;
	const mockedAxios = axios as jest.Mocked<typeof axios>;

	beforeEach(() => {
		vehicleProvider = new VehicleProvider();
		mockResponse = {
			// Populate with expected properties for testing
			co2Emissions: 100,
			colour: 'Blue',
		} as VehicleData;

		// Setup axios mock
		mockedAxios.post.mockResolvedValue({
			data: mockResponse,
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		});

		// Setup mock for environment variable
		(EnvironmentVariables.get as jest.Mock).mockReturnValue('mockSecretKeyId');

		// Setup mock for SecretsManager
		(SecretsManager.get as jest.Mock).mockResolvedValue({
			dvlaUrl: 'https://some-random-url.com',
			dvlaApiKey: 'some-secret-key',
		});
	});

	it('should fetch vehicle data by VRM', async () => {
		const identifier = 'TEST123';
		const response = await vehicleProvider.getVehicleByVrm(identifier);

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'https://some-random-url.com',
			{ registrationNumber: identifier },
			{
				headers: {
					'x-api-key': 'some-secret-key',
					'Content-Type': 'application/json',
				},
			}
		);

		expect(response.data).toEqual(mockResponse);
	});
});
