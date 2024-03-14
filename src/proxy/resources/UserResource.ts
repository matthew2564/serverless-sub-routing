import { JsonController, Param, Get, Res, NotFoundError, Post, Body, HttpError, HttpCode } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import type { Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from '@aws-lambda-powertools/logger';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { UserService } from '../../services/UserService';
import { User } from '../../domain/models/UserModel';
import { ErrorEnum } from '../../domain/enums/Error.enum';
import { LOGGER } from '../../domain/di-tokens/Tokens';
import { OpenAPISpecServers } from '../../../documentation/spec/servers/servers';
import { OpenAPISpecResponses } from '../../../documentation/spec/responses/responses';

@Service()
@JsonController('/1.0/users')
export class UserResource {
	constructor(
		@Inject() private userService: UserService,
		@Inject(LOGGER) private logger: Logger
	) {}

	@Get('/:staffNumber')
	@OpenAPI({
		description: 'API for retrieving a user by staff number',
		tags: ['Users'],
		servers: OpenAPISpecServers.SERVERS,
		responses: {
			'200': OpenAPISpecResponses.OK('UserGet'),
			'404': OpenAPISpecResponses.NOT_FOUND,
			'500': OpenAPISpecResponses.INTERNAL_SERVER_ERROR,
		},
	})
	async getUser(@Param('staffNumber') staffNumber: number, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ staffNumber });

			this.logger.debug(`Calling \`getUserByStaffNumber\``);

			await this.userService.getUserByStaffNumber(staffNumber.toString());

			this.logger.info(`User found`);

			return response.status(HttpStatus.OK).json({});
		} catch (err) {
			this.logger.error('[ERROR]: getUser', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(HttpStatus.NOT_FOUND).send({ message: ErrorEnum.NOT_FOUND });
			}

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: ErrorEnum.INTERNAL_SERVER_ERROR,
				error: ErrorEnum.ERROR_OCCURRED,
			});
		}
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	@OpenAPI({
		description: 'API for creating a user record',
		tags: ['Users'],
		servers: OpenAPISpecServers.SERVERS,
		responses: {
			'201': OpenAPISpecResponses.CREATED,
			'500': OpenAPISpecResponses.INTERNAL_SERVER_ERROR,
		},
	})
	async createUser(@Body({ validate: true }) user: User, @Res() response: Response) {
		try {
			this.logger.addPersistentLogAttributes({ ...user });

			this.logger.debug(`Calling \`postUser\``);

			await this.userService.postUser(user);

			this.logger.info(`User added`);

			return response.status(HttpStatus.CREATED).json({ message: `User added: ${user.staffNumber}` });
		} catch (err) {
			this.logger.error('[ERROR]: postUser', { err: (err as Error)?.message });

			const errorDetails =
				err instanceof HttpError && err.message?.includes(ErrorEnum.CREATING)
					? `${ErrorEnum.CREATING}`
					: `${ErrorEnum.UNKNOWN}`;

			return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				message: `${ErrorEnum.INTERNAL_SERVER_ERROR}`,
				error: errorDetails,
			});
		}
	}
}
