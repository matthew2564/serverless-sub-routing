import { Request, Response, NextFunction } from 'express';
import { NotFoundMiddleware } from '../NotFoundMiddleware';

describe('NotFoundMiddleware', () => {
	let middleware: NotFoundMiddleware;
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let mockNext: NextFunction;

	beforeEach(() => {
		middleware = new NotFoundMiddleware();
		mockRequest = {
			method: 'GET',
		};
		mockResponse = {
			headersSent: false,
			status: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
		mockNext = jest.fn();
	});

	it('should send 404 with a message if headers have not been sent', () => {
		mockRequest.path = '/non-existent-route';

		middleware.use(mockRequest as Request, mockResponse as Response, mockNext);

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
