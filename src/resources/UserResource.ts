import { JsonController, Param, Get, Res, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { UserService } from '../services/UserService';
import { name, version } from '../../package.json';

@Service()
@JsonController('/1.0/users')
export class UserResource {
	private readonly logger: Logger = new Logger({
		serviceName: name,
		logLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
	});

	constructor(private userService: UserService) {
		this.userService = Container.get(UserService);
	}

	@Get('/version')
	getVersion(@Res() response: Response) {
		this.logger.debug(`Version v${version}`);

		return response.status(200).json({ version });
	}

	@Get('/:staffNumber')
	async getUser(@Param('staffNumber') staffNumber: string, @Res() response: Response) {
		try {
			this.logger.info(`Calling \`getUserByStaffNumber\` with staff number ${staffNumber}`);

			await this.userService.getUserByStaffNumber(staffNumber);

			this.logger.debug(`User found with staff number ${staffNumber}`);

			return response.status(200).json({});
		} catch (err) {
			this.logger.error('[ERROR]: getUser', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(404).send({ message: 'User not found' });
			}
			return response.status(500).send({ message: 'Internal server error' });
		}
	}
}
