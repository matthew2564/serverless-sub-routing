import { Container, Service } from 'typedi';
import { NotFoundError } from 'routing-controllers';
import { UserProvider } from '../../providers/UserProvider';
import { UserService } from '../UserService';

jest.mock('../../providers/UserProvider');

describe('UserService', () => {
	let userService: UserService;
	let mockUserProvider: jest.Mocked<UserProvider>;

	@Service()
	class UserProviderMock extends UserProvider {
		constructor() {
			super();
		}

		async findUserRecord() {
			return null;
		}
	}

	beforeEach(() => {
		// set the mock implementation
		Container.set(UserProvider, new UserProviderMock());

		// get the mock provider from the container
		mockUserProvider = Container.get(UserProvider) as jest.Mocked<UserProvider>;

		// inject the mock provider into the service
		userService = new UserService(mockUserProvider);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUserByStaffNumber', () => {
		it('should throw NotFoundError if user is not found', async () => {
			mockUserProvider.findUserRecord.mockResolvedValue(null);

			await expect(userService.getUserByStaffNumber('12345')).rejects.toThrow(NotFoundError);
		});

		it('should return user details if user is found', async () => {
			const mockUser = { id: '1', name: 'John Doe', staffNumber: '12345' };
			mockUserProvider.findUserRecord.mockResolvedValue(mockUser);

			await expect(userService.getUserByStaffNumber('12345')).resolves.not.toThrow();
		});
	});
});
