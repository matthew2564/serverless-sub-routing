import { NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi';
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

	describe('getVersion', () => {
		it('should return the version from the package.json', () => {
			userResource.getVersion(mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({ version });
		});
	});

	describe('getUser', () => {
		it('should return 200 when user is found', async () => {
			await userResource.getUser('123', mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({});
		});

		it('should return 404 when user is not found', async () => {
			mockUserService.getUserByStaffNumber.mockRejectedValue(new NotFoundError('User not found'));

			await userResource.getUser('456', mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'User not found' });
		});

		it('should return 500 if undefined error', async () => {
			mockUserService.getUserByStaffNumber.mockRejectedValue(new Error('Unexpected error'));

			await userResource.getUser('789', mockResponse as Response);

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});
});
