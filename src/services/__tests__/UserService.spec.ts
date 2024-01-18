import { Container } from 'typedi';
import { HttpError, NotFoundError } from 'routing-controllers';
import { UserProvider } from '../../providers/UserProvider';
import { UserService } from '../UserService';
import { User } from '../../models/UserModel';
import { UserProviderMock } from '../../providers/__mocks__/UserProvider.mock';

jest.mock('../../providers/UserProvider');

describe('UserService', () => {
	let userService: UserService;
	let mockUserProvider: jest.Mocked<UserProvider>;

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
