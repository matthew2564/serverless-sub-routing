import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Container, Service } from 'typedi';
import { LOGGER } from '../repository/di-tokens';

@Service()
@Middleware({ type: 'after', priority: 1 })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
	use({ method, path }: Request, res: Response, next: NextFunction) {
		if (!res.headersSent) {
			const logger = Container.get(LOGGER);

			const msg = `Route '${path}' not found for ${method}`;

			logger.error('[ERROR]: NotFoundMiddleware', msg);

			return res.status(404).send({ message: msg });
		}
		next();
	}
}
