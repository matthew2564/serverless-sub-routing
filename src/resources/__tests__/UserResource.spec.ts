import { HttpError, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi';
import { version } from '../../../package.json';
import { UserService } from '../../services/UserService';
import { UserProvider } from '../../providers/UserProvider';
import { UserResource } from '../UserResource';
import { User } from '../../models/UserModel';
import { ErrorEnum } from '../../enums/Error.enum';

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
	const mockUser: User = {
		staffNumber: '123',
		age: 65,
	};

	beforeEach(() => {
		mockUserService = new UserService(new UserProvider()) as jest.Mocked<UserService>;

		jest.spyOn(Container, 'get').mockImplementation((token) => {
			if (token === UserService) {
				return mockUserService;
			}
			throw new Error(`Unexpected token: ${token}`);
		});

		userResource = new UserResource(mockUserService);

		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		};
	});

	describe('authRestrictedRoute', () => {
		it('should return the status code for being able to be accessed', () => {
			// ACT
			userResource.authRestrictedRoute(mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(200);
		});
	});

	describe('getVersion', () => {
		it('should return the version from the package.json', () => {
			// ACT
			userResource.getVersion(mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({ version });
		});
	});

	describe('getUser', () => {
		it('should return 200 when user is found', async () => {
			// ACT
			await userResource.getUser(123, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({});
		});

		it('should return 404 when user is not found', async () => {
			// ARRANGE
			mockUserService.getUserByStaffNumber.mockRejectedValue(new NotFoundError('User not found'));

			// ACT
			await userResource.getUser(456, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'User not found' });
		});

		it('should return 500 if undefined error', async () => {
			// ARRANGE
			mockUserService.getUserByStaffNumber.mockRejectedValue(new Error('Unexpected error'));

			// ACT
			await userResource.getUser(789, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});

	describe('postUser', () => {
		it('should return 201 when user is created successfully', async () => {
			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User added: 123' });
		});

		it('should return 500 when an unexpected/unknown error occurs', async () => {
			// ARRANGE
			mockUserService.postUser.mockRejectedValue(new HttpError(500, ErrorEnum.CREATING));

			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error. Failed to create.' });
		});

		it('should return 500 when an unexpected/unknown error occurs', async () => {
			// ARRANGE
			mockUserService.postUser.mockRejectedValue(new HttpError(500, 'Unexpected err'));

			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error. Unknown error.' });
		});
	});
});
