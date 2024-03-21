import { Inject, Service } from 'typedi';
import { HttpError, NotFoundError } from 'routing-controllers';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { UserProvider } from '../providers/UserProvider';
import { ErrorEnum } from '../domain/enums/Error.enum';
import type { User } from '../domain/models/UserModel';
import { CustomError } from '../domain/models/CustomError';

@Service()
export class UserService {
	constructor(@Inject() private userProvider: UserProvider) {}

	async getUserByStaffNumber(staffNumber: string): Promise<void> {
		const user = await this.userProvider.findUserRecord(staffNumber);

		if (!user) {
			throw new NotFoundError(`User with staff number ${staffNumber} not found`);
		}
	}

	async postUser(user: User): Promise<void> {
		const statusCode = await this.userProvider.postUserRecord(user);

		if (statusCode !== HttpStatus.OK) {
			throw new HttpError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				`${ErrorEnum.CREATING}. StatusCode from DynamoDB: ${statusCode}`
			);
		}
	}

	async deleteUser(staffNumber: string): Promise<void> {
		const statusCode = await this.userProvider.deleteUserRecord(staffNumber);

		if (statusCode !== HttpStatus.OK) {
			throw new CustomError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				`${ErrorEnum.DELETING}. StatusCode from DynamoDB: ${statusCode}`
			);
		}
	}
}
