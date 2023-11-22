import { Service } from 'typedi';
import { NotFoundError } from 'routing-controllers';
import { UserProvider } from '../providers/UserProvider';

@Service()
export class UserService {
	constructor(private userProvider: UserProvider) {}

	async getUserByStaffNumber(staffNumber: string): Promise<void> {
		const user = await this.userProvider.findUserRecord(staffNumber);

		if (!user) {
			throw new NotFoundError(`User with staff number ${staffNumber} not found`);
		}
	}
}
