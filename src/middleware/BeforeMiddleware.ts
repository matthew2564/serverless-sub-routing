import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { LOGGER } from '../domain/di-tokens/Tokens';
import { name } from '../../package.json';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';

@Service()
@Middleware({ type: 'before', priority: Priority.HIGHEST })
export class BeforeMiddleware implements ExpressMiddlewareInterface {
	async use(_req: Request, _res: Response, next: NextFunction) {
		const logger = new Logger({
			serviceName: name,
			logLevel: (process.env.LOG_LEVEL as LogLevel) || 'debug',
		});

		// store logger instance in container
		Container.set(LOGGER, logger);

		logger.debug('BeforeMiddleware: Finished.');
		next();
	}
}
