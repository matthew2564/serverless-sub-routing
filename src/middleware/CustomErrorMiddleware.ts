import { BadRequestError, ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { ValidationError } from 'class-validator';
import { ErrorEnum } from '../enums/Error.enum';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { LOGGER } from '../repository/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';

@Service()
@Middleware({ type: 'after', priority: 1 })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
	private static ValueSanitiserRegExp = /\(.*?\)/g;

	error(error: unknown, _request: Request, response: Response, next: NextFunction) {
		const logger = Container.get(LOGGER);

		// thrown when token invalid/expired or not set .env up correctly for hitting remote resources
		if ((error as Error)?.name === ErrorEnum.UNRECOGNIZED_CLIENT_EXCEPTION) {
			const err = error as Error;

			this.logError(logger, '[ERROR]: CustomErrorMiddleware - UnrecognizedClientException', err);

			return response.status(HttpStatus.BAD_REQUEST).send({
				message: err.name,
				detail: err.message,
			});
		}

		// thrown via the decorator validators, e.g. if it should be a number but is a string
		// or whether the body does not parse as expected
		if (
			error instanceof HttpError &&
			(error.name === ErrorEnum.PARAM_NORMALISATION_ERROR || error.name === ErrorEnum.PARAM_PARSE_JSON_ERROR)
		) {
			this.logError(logger, '[ERROR]: CustomErrorMiddleware - instanceof HttpError & ParamError', error);

			return response.status(error.httpCode).send({
				message: error.message.replace(CustomErrorMiddleware.ValueSanitiserRegExp, 'supplied'),
			});
		}

		if (error instanceof BadRequestError) {
			this.logError(logger, '[ERROR]: CustomErrorMiddleware - instanceof BadRequestError', error);

			const requestError = error as BadRequestError & { errors: ValidationError[] };

			return response.status(requestError.httpCode).send({
				message: ErrorEnum.VALIDATION,
				errors: requestError.errors.map((item) => Object.values(item.constraints!)).flat(),
			});
		}

		if (error instanceof Error) {
			this.logError(logger, '[ERROR]: CustomErrorMiddleware - instanceof Error', error);

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: ErrorEnum.INTERNAL_SERVER_ERROR,
				detail: 'An application error has occurred and has been logged.',
			});
		}

		// This is log for anything that falls through the cracks. This should never in theory run, although would
		// give visibility of errors that are not being caught correctly.
		logger.error(
			'[ERROR]: CustomErrorMiddleware - Uncaught error',
			'name' in (error as Error) && 'message' in (error as Error) ? (error as Error) : JSON.stringify(error)
		);

		next();
	}

	private logError(logger: Logger, message: string, error: Error) {
		logger.error(message, {
			name: error.name,
			message: error.message,
		});
	}
}
