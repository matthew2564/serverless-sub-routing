import { Middleware, ExpressErrorMiddlewareInterface, HttpError, BadRequestError } from 'routing-controllers';
import { NextFunction, Response, Request } from 'express';
import { Service } from 'typedi';
import { ValidationError } from 'class-validator';
import { ErrorEnum } from '../enums/Error.enum';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
	private static ValueSanitiserRegExp = /\(.*?\)/g;

	error(error: unknown, _request: Request, response: Response, next: NextFunction) {
		if ((error as Error)?.name === 'UnrecognizedClientException') {
			console.error(`[ERROR]: CustomErrorMiddleware - UnrecognizedClientException`, error);

			return response.status(HttpStatus.BAD_REQUEST).send({
				message: (error as Error).name,
				detail: (error as Error).message,
			});
		}

		if (
			error instanceof HttpError &&
			(error.name === 'ParamNormalizationError' || error.name === 'ParameterParseJsonError')
		) {
			console.error(`[ERROR]: CustomErrorMiddleware - instanceof HttpError & ParamError`, error);

			return response.status(error.httpCode).send({
				message: error.message.replace(CustomErrorMiddleware.ValueSanitiserRegExp, 'supplied'),
			});
		}

		if (error instanceof BadRequestError) {
			console.error(`[ERROR]: CustomErrorMiddleware - instanceof BadRequestError`, error);

			const requestError = error as BadRequestError & { errors: ValidationError[] };

			return response.status(requestError.httpCode).send({
				message: ErrorEnum.VALIDATION,
				errors: requestError.errors.map((item) => Object.values(item.constraints!)).flat(),
			});
		}

		if (error instanceof Error) {
			console.error(`[ERROR]: CustomErrorMiddleware - instanceof Error`, error);

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: ErrorEnum.INTERNAL_SERVER_ERROR,
				detail: 'An application error has occurred and has been logged.',
			});
		}

		// This is log for anything that falls through the cracks. This should never in theory run, although would
		// give visibility of errors that are not being caught correctly.
		console.error(`[ERROR]: CustomErrorMiddleware - Uncaught error`, error);

		next();
	}
}
