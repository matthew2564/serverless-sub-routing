import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { createConnection } from 'mysql2';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { SecretsManager } from '@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { CONNECTION, LOGGER, SECRET } from '../domain/di-tokens/di-tokens';
import { name } from '../../package.json';
import { Secret } from '../domain/models/Secret';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';
import { BodyParser } from '../domain/helpers/body-parser';

@Service()
@Middleware({ type: 'before', priority: Priority.HIGHEST })
export class BeforeMiddleware implements ExpressMiddlewareInterface {
	private readonly logger: Logger = new Logger({
		serviceName: name,
		logLevel: (process.env.LOG_LEVEL as LogLevel) || 'debug',
	});

	async use(_req: Request, _res: Response, next: NextFunction) {
		this.logger.debug('BeforeMiddleware: Starting.');

		// if the request has a body, then parse it into JSON
		if (_req.body) {
			_req.body = BodyParser(_req.body);
		}

		// store logger instance in container
		this.initLogger();

		// don't set up secrets or connection if hitting `/version` endpoint
		// if (!req.path.endsWith('/version')) {
		// store secret in container
		await this.initSecrets();

		// store the connection in container
		this.initConnection(Container.get(SECRET) as Secret);
		// }

		this.logger.debug('BeforeMiddleware: Finished.');

		next();
	}

	private initLogger() {
		Container.set(LOGGER, this.logger);
	}

	private async initSecrets() {
		const secret = await SecretsManager.get<Secret>({
			SecretId: EnvironmentVariables.get('secretkey'),
		});
		Container.set(SECRET, secret);
	}

	private initConnection(secret: Secret) {
		// @TODO: Ask SMC to create a `host` key in secrets manager

		const connection = createConnection({
			host: secret.host,
			database: secret.target,
			user: secret.username,
			password: secret.password,
			charset: 'UTF8_GENERAL_CI',
		});
		Container.set(CONNECTION, connection);
	}
}
