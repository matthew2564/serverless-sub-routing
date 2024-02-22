import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';
import { LOGGER, SESSION } from '../domain/di-tokens/di-tokens';

@Service()
@Middleware({ type: 'after', priority: Priority.LOW })
export class AfterMiddleware implements ExpressMiddlewareInterface {
	use(_req: Request, _res: Response, next: NextFunction) {
		const session = Container.get(SESSION);

		if (session) {
			Container.get(LOGGER).debug('AfterMiddleware: Ending session.');
			session.end();
		}

		next();
	}
}
