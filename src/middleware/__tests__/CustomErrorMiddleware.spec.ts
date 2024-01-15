import { HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { CustomErrorMiddleware } from '../CustomErrorMiddleware';

describe('CustomErrorMiddleware', () => {
	const middleware = new CustomErrorMiddleware();
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let mockNext: NextFunction;
	const errorMessage = 'Given parameter staffNumber is invalid. Value ("version1111") cannot be parsed into number.';

	beforeEach(() => {
		mockRequest = {};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
		mockNext = jest.fn();
	});

	it('should handle HttpError correctly', () => {
		const httpError = new HttpError(400, errorMessage);

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.send).toHaveBeenCalledWith({
			message: 'Given parameter staffNumber is invalid. Value supplied cannot be parsed into number.',
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should call next function for non-HttpError', () => {
		const regularError = new Error('Regular error');

		middleware.error(regularError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.send).not.toHaveBeenCalled();
	});
});
