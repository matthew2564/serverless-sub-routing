import { Inject, Service } from 'typedi';
import { HttpError, NotFoundError } from 'routing-controllers';
import { UserProvider } from '../providers/UserProvider';
import { ErrorEnum } from '../domain/enums/Error.enum';
import type { User } from '../domain/models/UserModel';

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

		if (statusCode !== 200) {
			throw new HttpError(500, `${ErrorEnum.CREATING}. StatusCode from DynamoDB: ${statusCode}`);
		}
	}
}
