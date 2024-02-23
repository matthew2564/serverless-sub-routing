import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { createConnection } from 'mysql2';
import { readdirSync } from 'fs';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { SecretsManager } from '@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client';
import { EnvironmentVariables } from '@dvsa/cvs-microservice-common/classes/misc/env-vars';
import { default as Session } from 'mybatis-mapper/create-session';
import { LOGGER, SECRET, SESSION } from '../domain/di-tokens/di-tokens';
import { name } from '../../package.json';
import { Secret } from '../domain/models/Secret';
import { Priority } from '../domain/enums/MiddlewarePriority.enum';
import { BodyParser } from '../domain/helpers/BodyParser';
import path from 'path';

@Service()
@Middleware({ type: 'before', priority: Priority.HIGHEST })
export class BeforeMiddleware implements ExpressMiddlewareInterface {
	async use(req: Request, _res: Response, next: NextFunction) {
		const logger = new Logger({
			serviceName: name,
			logLevel: (process.env.LOG_LEVEL as LogLevel) || 'debug',
		});

		// store logger instance in container
		Container.set(LOGGER, logger);

		logger.debug('BeforeMiddleware: Starting.');

		// if the request has a body, then parse it into JSON
		if (req.body && (req.method === 'POST' || req.method === 'PUT')) {
			req.body = BodyParser(req.body);
		}

		// store secret in container
		const secret = await this.initSecrets();

		// validate secret is populated as expected
		try {
			this.validateSecret(secret);
		} catch (err) {
			logger.error(`BeforeMiddleware: ${(err as Error).message}.`);
			throw err;
		}

		// store the connection session in the container
		this.initSession(secret);

		logger.debug('BeforeMiddleware: Finished.');
		next();
	}

	private async initSecrets() {
		const secret = await SecretsManager.get<Secret>({
			SecretId: EnvironmentVariables.get('secretkey'),
		});

		Container.set(SECRET, secret);

		return secret;
	}

	private initSession(secret: Secret) {
		const connection = createConnection({
			// host: secret.host,
			// @TODO: Ask SMC to create a `host` key in secrets manager
			host: process.env.DB_HOST,
			database: secret.target,
			user: secret.username,
			password: secret.password,
			charset: 'UTF8_GENERAL_CI',
		});

		// scan the mappers dir and construct the full relative path of each
		const mapperPaths = readdirSync(path.resolve(__dirname, './mappers'), { withFileTypes: true })
			.filter((item) => !item.isDirectory())
			.map((file) => path.resolve(__dirname, './mappers/', file.name));

		// initialise the session and store it in the container
		Container.set(SESSION, new Session(connection, 'dvsa.mc', mapperPaths, false));
	}

	private validateSecret(secret: Secret) {
		// @TODO: Re-enable
		// if (!secret.host) throw new Error('Secret is missing `host`');
		if (!secret.username) throw new Error('Secret is missing `username`');
		if (!secret.password) throw new Error('Secret is missing `password`');
		if (!secret.target) throw new Error('Secret is missing `target`');
	}
}
