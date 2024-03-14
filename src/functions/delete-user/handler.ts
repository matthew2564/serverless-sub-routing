import 'reflect-metadata';
import { Container, Inject } from 'typedi';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { Response as response } from '@dvsa/cvs-microservice-common/response/create';
import { Logger } from '@aws-lambda-powertools/logger';
import type { LogLevel } from '@aws-lambda-powertools/logger/lib/cjs/types/Log';
import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { name } from '../../../package.json';
import { ErrorEnum } from '../../domain/enums/Error.enum';
import { UserService } from '../../services/UserService';

class LambdaHandler implements LambdaInterface {
	private logger: Logger;

	constructor(@Inject() private userService: UserService) {
		this.logger = new Logger({
			serviceName: name,
			logLevel: (process.env.LOG_LEVEL as LogLevel) || 'debug',
		});
	}

	async handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
		try {
			const staffNumber = event?.pathParameters?.staffNumber;

			if (!staffNumber) {
				throw new Error(ErrorEnum.VALIDATION);
			}

			this.logger.addPersistentLogAttributes({ staffNumber });

			this.logger.debug(`Calling \`deleteUser\``);

			await this.userService.deleteUser(staffNumber);

			this.logger.info(`User deleted`);

			return response.status(HttpStatus.OK).payload({ message: 'User deleted' });
		} catch (err) {
			this.logger.error('[ERROR]: deleteUser', { err });

			if (err instanceof Error && err.message === ErrorEnum.VALIDATION) {
				return response.status(HttpStatus.BAD_REQUEST).payload({
					message: ErrorEnum.VALIDATION,
					error: 'Missing required parameter: `staffNumber`',
				});
			}

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).payload({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}
}

const lambdaHandler = new LambdaHandler(Container.get(UserService));

export const handler = lambdaHandler.handler.bind(lambdaHandler);
