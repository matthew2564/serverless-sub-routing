import { BadRequestError, HttpError } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { CustomErrorMiddleware } from '../../../../src/proxy/middleware/CustomErrorMiddleware';
import { ValidationError } from 'class-validator';
import { ExpressMock } from '../../../mocks/packages/express.mock';
import { Container } from 'typedi';
import { LOGGER } from '../../../../src/domain/di-tokens/Tokens';
import { AWSPowerToolsLoggerMock } from '../../../mocks/packages/power-tools-logger.mock';
import { CustomError } from '../../../../src/domain/models/CustomError';
import { ErrorEnum } from '../../../../src/domain/enums/Error.enum';
import { Logger } from '@aws-lambda-powertools/logger';

type Constraint = { [type: string]: string };

describe('CustomErrorMiddleware', () => {
	const middleware = new CustomErrorMiddleware();
	let mockRequest: Partial<Request>;
	const mockResponse: Partial<Response> = ExpressMock.factory;
	const mockNext: NextFunction = jest.fn();
	let mockLogger: jest.Mocked<Logger>;
	const errorMessage = 'Given parameter staffNumber is invalid. Value ("version1111") cannot be parsed into number.';

	beforeEach(() => {
		mockRequest = {};

		// set the logger mock
		Container.set(LOGGER, AWSPowerToolsLoggerMock.factory.Logger);

		// get the mock logger from the container
		mockLogger = Container.get(LOGGER) as jest.Mocked<Logger>;
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should handle HttpError correctly for ParamNormalizationError's", () => {
		const httpError = new HttpError(400, errorMessage);
		httpError.name = 'ParamNormalizationError';

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(
			`[ERROR]: CustomErrorMiddleware - instanceof HttpError & ParamError`,
			{ error: httpError }
		);
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.send).toHaveBeenCalledWith({
			message: 'Given parameter staffNumber is invalid. Value supplied cannot be parsed into number.',
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it("should handle HttpError correctly for ParameterParseJsonError's", () => {
		const httpError = new HttpError(400, errorMessage);
		httpError.name = 'ParameterParseJsonError';

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(
			`[ERROR]: CustomErrorMiddleware - instanceof HttpError & ParamError`,
			{ error: httpError }
		);
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.send).toHaveBeenCalledWith({
			message: 'Given parameter staffNumber is invalid. Value supplied cannot be parsed into number.',
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should handle HttpError correctly for a BadRequestError', () => {
		const httpError = new BadRequestError('Some error message');

		(httpError as BadRequestError & { errors: ValidationError[] }).errors = [
			{ constraints: { email: 'Email is invalid' } as Constraint },
			{ constraints: { staffNumber: 'Must be a minimum of 3 characters' } as Constraint },
		] as ValidationError[];

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(`[ERROR]: CustomErrorMiddleware - instanceof BadRequestError`, {
			error: httpError,
		});
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.send).toHaveBeenCalledWith({
			message: ErrorEnum.VALIDATION,
			errors: ['Email is invalid', 'Must be a minimum of 3 characters'],
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should handle HttpError correctly for a CustomError', () => {
		const httpError = new CustomError('Some custom error', 400);
		httpError.name = 'CustomError';

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(`[ERROR]: CustomErrorMiddleware - instanceof CustomError`, {
			error: httpError,
		});
		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.send).toHaveBeenCalledWith({
			detail: 'Some custom error',
			message: ErrorEnum.VALIDATION,
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should handle HttpError correctly for Error classes', () => {
		const httpError = new Error('ERROR');
		httpError.name = 'Error';

		middleware.error(httpError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(`[ERROR]: CustomErrorMiddleware - instanceof Error`, httpError);
		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.send).toHaveBeenCalledWith({
			message: ErrorEnum.INTERNAL_SERVER_ERROR,
			detail: 'An application error has occurred and has been logged.',
		});
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should call next function for non-HttpError', () => {
		const regularError = {};

		middleware.error(regularError, mockRequest as Request, mockResponse as Response, mockNext);

		expect(mockLogger.error).toHaveBeenCalledWith(
			`[ERROR]: CustomErrorMiddleware - Uncaught error`,
			regularError as Error
		);
		expect(mockResponse.status).not.toHaveBeenCalled();
		expect(mockResponse.send).not.toHaveBeenCalled();
	});
});
