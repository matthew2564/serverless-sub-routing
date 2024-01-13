import { JsonController, Param, Get, Res, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container, Service } from 'typedi';
import { UserService } from '../services/UserService';
import { version } from '../../package.json';

@Service()
@JsonController('/1.0/users')
export class UserResource {
	constructor(private userService: UserService) {
		this.userService = Container.get(UserService);
	}

	@Get('/version')
	getVersion(@Res() response: Response) {
		return response.status(200).json({ version });
	}

	@Get('/:staffNumber')
	async getUser(@Param('staffNumber') staffNumber: string, @Res() response: Response) {
		try {
			await this.userService.getUserByStaffNumber(staffNumber);

			return response.status(200).json({});
		} catch (err) {
			// report to common logger service
			console.error('[ERROR]: getUser', (err as Error).message);

			if (err instanceof NotFoundError) {
				return response.status(404).send({ message: 'User not found' });
			}
			return response.status(500).send({ message: 'Internal server error' });
		}
	}
}
