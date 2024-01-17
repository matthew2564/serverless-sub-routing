import { Authorized, JsonController, Param, Get, Res, NotFoundError, Post, Body, HttpError } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { LogLevel } from '@aws-lambda-powertools/logger/lib/types';
import { UserService } from '../services/UserService';
import { name, version } from '../../package.json';
import { User } from '../models/UserModel';
import { ErrorEnum } from '../enums/Error.enum';

@Service()
@JsonController('/1.0/users')
export class UserResource {
	private readonly logger: Logger = new Logger({
		serviceName: name,
		logLevel: (process.env.LOG_LEVEL as LogLevel) || 'info',
	});

	constructor(@Inject() private userService: UserService) {
		this.userService = userService;
	}

	@Get('/auth')
	@Authorized(['RequiredRole'])
	authRestrictedRoute(@Res() response: Response) {
		return response.status(200).json({ message: 'Data returning' });
	}

	@Get('/version')
	getVersion(@Res() response: Response) {
		this.logger.debug(`Version v${version}`);

		return response.status(200).json({ version });
	}

	@Get('/:staffNumber')
	async getUser(@Param('staffNumber') staffNumber: number, @Res() response: Response) {
		try {
			this.logger.info(`Calling \`getUserByStaffNumber\` with staff number ${staffNumber}`);

			await this.userService.getUserByStaffNumber(staffNumber.toString());

			this.logger.debug(`User found with staff number ${staffNumber}`);

			return response.status(200).json({});
		} catch (err) {
			this.logger.error('[ERROR]: getUser', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(404).send({ message: ErrorEnum.NOT_FOUND });
			}
			return response.status(500).send({ message: ErrorEnum.INTERNAL_SERVER_ERROR });
		}
	}

	@Post('/')
	async createUser(@Body({ validate: true }) user: User, @Res() response: Response) {
		try {
			this.logger.info(`Calling \`postUser\` with payload ${user}`);

			await this.userService.postUser(user);

			this.logger.debug(`User added with staff number ${user.staffNumber}`);

			return response.status(201).json({ message: `User added: ${user.staffNumber}` });
		} catch (err) {
			this.logger.error('[ERROR]: postUser', { err: (err as Error)?.message });

			const message =
				err instanceof HttpError && err.message?.includes(ErrorEnum.CREATING)
					? `${ErrorEnum.INTERNAL_SERVER_ERROR}. ${ErrorEnum.CREATING}.`
					: `${ErrorEnum.INTERNAL_SERVER_ERROR}. ${ErrorEnum.UNKNOWN}.`;

			return response.status(500).send({ message });
		}
	}
}
