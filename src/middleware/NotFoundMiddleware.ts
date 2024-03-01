import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Container, Service } from 'typedi';
import { LOGGER } from '../domain/di-tokens/di-tokens';

@Service()
@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
	use({ method, path }: Request, res: Response, next: NextFunction) {
		if (!res.headersSent) {
			const logger = Container.get(LOGGER);

			logger.error('[ERROR]: NotFoundMiddleware', `Route '${path}' not found for ${method}`);

			return res.status(404).send({ message: `Route '${path}' not found for ${method}` });
		}
		next();
	}
}
