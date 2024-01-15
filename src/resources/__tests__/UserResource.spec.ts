import { NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container, Service } from 'typedi';
import { version } from '../../../package.json';
import { UserService } from '../../services/UserService';
import { UserProvider } from '../../providers/UserProvider';
import { UserResource } from '../UserResource';

jest.mock('../../services/UserService');
jest.mock('../../providers/UserProvider');
jest.mock('@aws-lambda-powertools/logger', () => ({
	Logger: jest.fn().mockImplementation(() => ({
		info: jest.fn(),
		debug: jest.fn(),
		error: jest.fn(),
	})),
}));

describe('UserResource', () => {
	let userResource: UserResource;
	let mockUserService: jest.Mocked<UserService>;
	let mockResponse: Partial<Response>;

	@Service()
	class UserServiceMock extends UserService {
		constructor() {
			super({} as UserProvider);
		}

		async getUserByStaffNumber() {
			return;
		}
	}

	beforeEach(() => {
		// set the mock implementation
		Container.set(UserService, new UserServiceMock());

		// get the mock service from the container
		mockUserService = Container.get(UserService) as jest.Mocked<UserService>;

		// inject the mock service into the resource
		userResource = new UserResource(mockUserService);

		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
	});

	describe('getVersion', () => {
		it('should return the version from the package.json', () => {
			userResource.getVersion(mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({ version });
		});
	});

	describe('getUser', () => {
		it('should return 200 when user is found', async () => {
			await userResource.getUser(123, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({});
		});

		it('should return 404 when user is not found', async () => {
			mockUserService.getUserByStaffNumber.mockRejectedValue(new NotFoundError('User not found'));

			await userResource.getUser(456, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'User not found' });
		});

		it('should return 500 if undefined error', async () => {
			mockUserService.getUserByStaffNumber.mockRejectedValue(new Error('Unexpected error'));

			await userResource.getUser(789, mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});
});
