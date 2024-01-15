import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { NextFunction, Response, Request } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorMiddleware implements ExpressErrorMiddlewareInterface {
	private static ValueSanitiserRegExp = /\(.*?\)/g;

	error(error: unknown, _request: Request, response: Response, next: NextFunction) {
		if (error instanceof HttpError) {
			const body = {
				message: error.message.replace(CustomErrorMiddleware.ValueSanitiserRegExp, 'supplied'),
			};
			return response.status(error.httpCode).send(body);
		}
		next();
	}
}
