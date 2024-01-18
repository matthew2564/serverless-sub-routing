import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
	use({ method, path }: Request, res: Response, next: NextFunction) {
		if (!res.headersSent) {
			return res.status(404).send({ message: `Route '${path}' not found for ${method}` });
		}
		next();
	}
}
