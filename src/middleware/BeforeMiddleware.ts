import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import {Container, Service} from 'typedi';
import {SecretsManager} from "@dvsa/cvs-microservice-common/classes/aws/secrets-manager-client";
import {EnvironmentVariables} from "@dvsa/cvs-microservice-common/classes/misc/env-vars";
import {Secret} from "../models/Secret";
import {LOGGER, SECRETS_MANAGER} from "../repository/di-tokens";
import {Logger} from "@aws-lambda-powertools/logger";
import {LogLevel} from "@aws-lambda-powertools/logger/lib/types";
import {name} from "../../package.json";

@Service()
@Middleware({ type: 'before' })
export class BeforeMiddleware implements ExpressMiddlewareInterface {
    async use(_req: Request, _res: Response, next: NextFunction) {
        const logger = new Logger({
            serviceName: name,
            logLevel: (process.env.LOG_LEVEL as LogLevel) || 'debug',
        });

        logger.debug('BeforeMiddleware: Setting up logger and secrets manager.');

        // store logger instance in container
        Container.set(LOGGER, logger);

        // store secret in container
        Container.set(SECRETS_MANAGER, await SecretsManager.get<Secret>({
            SecretId: EnvironmentVariables.get('secretkey'),
        }));

        logger.debug('BeforeMiddleware: Finished.');

        next();
    }
}
