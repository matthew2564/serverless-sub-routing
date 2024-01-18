import { Container } from 'typedi';
import { HttpError, NotFoundError } from 'routing-controllers';
import { UserProvider } from '../../providers/UserProvider';
import { UserService } from '../UserService';
import { User } from '../../models/UserModel';

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

		it('should not throw on success', async () => {
			const mockUser = { id: '1', name: 'John Doe', staffNumber: '12345' };
			mockUserProvider.findUserRecord.mockResolvedValue(mockUser);

			await expect(userService.getUserByStaffNumber('12345')).resolves.not.toThrow();
		});
	});

	describe('postUserRecord', () => {
		const user: User = { staffNumber: '12345', age: 12 };

		it('should throw HttpError if status code is not 200', async () => {
			mockUserProvider.postUserRecord.mockResolvedValue(undefined);

			await expect(userService.postUser(user)).rejects.toThrow(HttpError);
		});

		it('should not throw on success', async () => {
			mockUserProvider.postUserRecord.mockResolvedValue(200);

			await expect(userService.postUser(user)).resolves.not.toThrow();
		});
	});
});
