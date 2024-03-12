import { Response } from 'express';
import { Container } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { AWSPowerToolsLoggerMock } from '../../../mocks/packages/power-tools-logger.mock';
import { ExpressMock } from '../../../mocks/packages/express.mock';
import { LOGGER } from '../../../../src/domain/di-tokens/Tokens';
import { VersionResource } from '../../../../src/proxy/resources/VersionResource';
import { VersionService } from '../../../../src/proxy/services/VersionService';
import { VersionServiceMock } from '../../../mocks/services/VersionService.mock';

jest.mock('../../../../src/proxy/services/VersionService');

describe('VersionResource', () => {
	let mockResource: VersionResource;
	let mockService: jest.Mocked<VersionService>;
	let mockLogger: jest.Mocked<Logger>;
	const mockResponse: Partial<Response> = ExpressMock.factory;

	beforeEach(() => {
		// set the mock implementation
		Container.set(VersionService, new VersionServiceMock());
		Container.set(LOGGER, AWSPowerToolsLoggerMock.factory.Logger);

		// get the mock service from the container
		mockService = Container.get(VersionService) as jest.Mocked<VersionService>;
		mockLogger = Container.get(LOGGER) as jest.Mocked<Logger>;

		// inject the mock service into the resource
		mockResource = new VersionResource(mockService, mockLogger);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getVersion', () => {
		it('should return 200 response', async () => {
			// ACT
			mockResource.getVersion(mockResponse as Response);

			// ASSERT
			expect(mockLogger.debug).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
			expect(mockResponse.status).toHaveBeenCalledWith(200);
		});
	});
});
