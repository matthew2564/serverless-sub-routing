import { Service } from 'typedi';
import { NotFoundError } from 'routing-controllers';
import { UserProvider } from '../providers/UserProvider';

@Service()
export class UserService {
	private userRepository: UserProvider;

	constructor(userRepository: UserProvider) {
		this.userRepository = userRepository;
	}

	async getUserByStaffNumber(staffNumber: string): Promise<void> {
		const user = await this.userRepository.findUserRecord(staffNumber);

		if (!user) {
			throw new NotFoundError(`User with staff number ${staffNumber} not found`);
		}
	}
}
