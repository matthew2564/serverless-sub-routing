import { Middleware, ExpressErrorMiddlewareInterface, HttpError, BadRequestError } from 'routing-controllers';
import { NextFunction, Response, Request } from 'express';
import { Container, Service } from 'typedi';
import { ValidationError } from 'class-validator';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';
import { LOGGER } from '../domain/di-tokens/di-tokens';

@Service()
@Middleware({ type: 'after', priority: Priority.MEDIUM })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
	private static ValueSanitiserRegExp = /\(.*?\)/g;

	error(error: unknown, _request: Request, response: Response, next: NextFunction) {
		const logger = Container.get(LOGGER);

		if (
			error instanceof HttpError &&
			(error.name === 'ParamNormalizationError' || error.name === 'ParameterParseJsonError')
		) {
			logger.error(`[ERROR]: CustomErrorMiddleware - instanceof HttpError & ParamError`, { error });

			return response.status(error.httpCode).send({
				message: error.message.replace(CustomErrorMiddleware.ValueSanitiserRegExp, 'supplied'),
			});
		}

		if (error instanceof BadRequestError) {
			logger.error(`[ERROR]: CustomErrorMiddleware - instanceof BadRequestError`, { error });

			const requestError = error as BadRequestError & { errors: ValidationError[] };

			return response.status(requestError.httpCode).send({
				message: ErrorEnum.VALIDATION,
				errors: requestError.errors.map((item) => Object.values(item.constraints!)).flat(),
			});
		}

		if (error instanceof Error) {
			logger.error(`[ERROR]: CustomErrorMiddleware - instanceof Error`, { error });

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: ErrorEnum.INTERNAL_SERVER_ERROR,
				detail: 'An application error has occurred and has been logged.',
			});
		}

		// This is log for anything that falls through the cracks. This should never in theory run, although would
		// give visibility of errors that are not being caught correctly.
		logger.error(`[ERROR]: CustomErrorMiddleware - Uncaught error`, { error });

		next();
	}
}
