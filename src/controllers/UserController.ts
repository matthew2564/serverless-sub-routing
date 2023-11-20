import { JsonController, Param, Get, Res, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';

@Service()
@JsonController('/users')
export class UserController {
	constructor(private userService: UserService) {}

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
