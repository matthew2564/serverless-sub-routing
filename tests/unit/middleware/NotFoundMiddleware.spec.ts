import { Request, Response, NextFunction } from 'express';
import { NotFoundMiddleware } from '../../../src/middleware/NotFoundMiddleware';
import { Logger } from '@aws-lambda-powertools/logger';
import { Container } from 'typedi';
import { LOGGER } from '../../../src/domain/di-tokens/Tokens';
import { AWSPowerToolsLoggerMock } from '../../mocks/packages/power-tools-logger.mock';
import { ExpressMock } from '../../mocks/packages/express.mock';

describe('NotFoundMiddleware', () => {
	let middleware: NotFoundMiddleware;
	const mockRequest: Partial<Request> = {
		method: 'GET',
	};
	const mockResponse: Partial<Response> = ExpressMock.factory;
	const mockNext: NextFunction = jest.fn();
	let mockLogger: jest.Mocked<Logger>;

	beforeEach(() => {
		middleware = new NotFoundMiddleware();

		// set the logger mock
		Container.set(LOGGER, AWSPowerToolsLoggerMock.factory.Logger);

		// get the mock logger from the container
		mockLogger = Container.get(LOGGER) as jest.Mocked<Logger>;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should send 404 with a message if headers have not been sent', () => {
		mockRequest.path = '/non-existent-route';

		middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(
			'[ERROR]: NotFoundMiddleware',
			"Route '/non-existent-route' not found for GET"
		);
		expect(mockResponse.status).toHaveBeenCalledWith(404);
		expect(mockResponse.send).toHaveBeenCalledWith({ message: "Route '/non-existent-route' not found for GET" });
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should call next if headers have already been sent', () => {
		mockResponse.headersSent = true;

		middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockNext).toHaveBeenCalled();
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.send).not.toHaveBeenCalled();
	});
});
