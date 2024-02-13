import { ExpressMiddlewareInterface, getMetadataArgsStorage, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';
import { LOGGER } from '../domain/di-tokens/di-tokens';

@Service()
@Middleware({ type: 'after', priority: Priority.LOWEST })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
	use({ method, path }: Request, res: Response, next: NextFunction) {
		if (!res.headersSent) {
			const logger = Container.get(LOGGER);

			const { actions, controllers } = getMetadataArgsStorage(); // MetadataArgsStorage

			const routes = actions.map((action) => {
				const { route, type } = action;

				const controller = controllers.find((controller) => controller.target === action.target);

				if (controller == null) {
					return { method: type, route: route };
				}

				const { route: baseRoute = '' } = controller;

				return `${type.toUpperCase()} ${baseRoute}${route}`;
			});

			const msg = `Route '${path}' not found for ${method}`;

			logger.error('[ERROR]: NotFoundMiddleware', { availableRoutes: routes.join(', '), url: msg });

			return res.status(404).send({ message: msg });
		}
		next();
	}
}
