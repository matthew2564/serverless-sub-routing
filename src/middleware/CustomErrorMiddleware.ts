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
		if (
			error instanceof HttpError &&
			(error.name === 'ParamNormalizationError' || error.name === 'ParameterParseJsonError')
		) {
			const body = {
				message: error.message.replace(CustomErrorMiddleware.ValueSanitiserRegExp, 'supplied'),
			};
			return response.status(error.httpCode).send(body);
		}

		if (error instanceof BadRequestError) {
			const requestError = error as BadRequestError & { errors: ValidationError[] };

			return response.status(requestError.httpCode).send({
				message: ErrorEnum.VALIDATION,
				errors: requestError.errors.map((item) => Object.values(item.constraints!)).flat(),
			});
		}

		if (error instanceof Error) {
			console.log('CustomErrorMiddleware', error);

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: ErrorEnum.INTERNAL_SERVER_ERROR,
				detail: 'An application error has occurred and has been logged.',
			});
		}

		next();
	}
}
