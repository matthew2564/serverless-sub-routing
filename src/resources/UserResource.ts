import { JsonController, Param, Get, Res, NotFoundError, Post, Body, HttpError } from 'routing-controllers';
import { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { UserService } from '../services/UserService';
import { User } from '../domain/models/UserModel';
import { ErrorEnum } from '../domain/enums/Error.enum';
import { LOGGER } from '../domain/di-tokens/di-tokens';

@Service()
@JsonController('/1.0/users')
export class UserResource {
	constructor(
		@Inject() private userService: UserService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('/:staffNumber')
	async getUser(@Param('staffNumber') staffNumber: number, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ staffNumber: staffNumber });

			this.logger.debug(`Calling \`getUserByStaffNumber\``);

			await this.userService.getUserByStaffNumber(staffNumber.toString());

			this.logger.info(`User found`);

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
			this.logger.addPersistentLogAttributes({ ...user });

			this.logger.debug(`Calling \`postUser\``);

			await this.userService.postUser(user);

			this.logger.info(`User added`);

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
