import { Inject, Service } from 'typedi';
import { HttpError, NotFoundError } from 'routing-controllers';
import { UserProvider } from '../providers/UserProvider';
import { User } from '../models/UserModel';
import { ErrorEnum } from '../enums/Error.enum';

@Service()
export class UserService {
	constructor(@Inject() private userProvider: UserProvider) {
		this.userProvider = userProvider;
	}

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
