import { Container } from 'typedi';
import { NotFoundError } from 'routing-controllers';
import { UserProvider } from '../../providers/UserProvider';
import { UserService } from '../UserService';

jest.mock('../../providers/UserProvider');

describe('UserService', () => {
	let userService: UserService;
	let mockUserProvider: jest.Mocked<UserProvider>;

	beforeEach(() => {
		mockUserProvider = new UserProvider() as jest.Mocked<UserProvider>;

		jest.spyOn(Container, 'get').mockImplementation((token) => {
			if (token === UserProvider) {
				return mockUserProvider;
			}
			throw new Error(`Unexpected token: ${token}`);
		});

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
