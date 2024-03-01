import { HttpError, NotFoundError } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '../../../src/services/UserService';
import { UserResource } from '../../../src/resources/UserResource';
import { User } from '../../../src/domain/models/UserModel';
import { ErrorEnum } from '../../../src/domain/enums/Error.enum';
import { UserServiceMock } from '../../mocks/services/UserService.mock';
import { LOGGER } from '../../../src/domain/di-tokens/di-tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { AWSPowerToolsLoggerMock } from '../../mocks/packages/power-tools-logger.mock';
import { ExpressMock } from '../../mocks/packages/express.mock';

jest.mock('../../../src/services/UserService');
jest.mock('../../../src/providers/UserProvider');

describe('UserResource', () => {
	let userResource: UserResource;
	let mockUserService: jest.Mocked<UserService>;
	let mockLogger: jest.Mocked<Logger>;
	const mockResponse: Partial<Response> = ExpressMock.factory;
	const mockUser: User = {
		staffNumber: '123',
		age: 65,
	};

	beforeEach(() => {
		// set the mock implementation
		Container.set(UserService, new UserServiceMock());
		Container.set(LOGGER, AWSPowerToolsLoggerMock.factory.Logger);

		// get the mock service from the container
		mockUserService = Container.get(UserService) as jest.Mocked<UserService>;
		mockLogger = Container.get(LOGGER) as jest.Mocked<Logger>;

		// inject the mock service into the resource
		userResource = new UserResource(mockUserService, mockLogger);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUser', () => {
		it('should return 200 when user is found', async () => {
			// ACT
			await userResource.getUser(123, mockResponse as Response);

			// ASSERT
			expect(mockLogger.debug).toHaveBeenCalledWith(`Calling \`getUserByStaffNumber\``);
			expect(mockLogger.info).toHaveBeenCalledWith('User found');
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({});
		});

		it('should return 404 when user is not found', async () => {
			// ARRANGE
			mockUserService.getUserByStaffNumber.mockRejectedValue(new NotFoundError('User not found'));

			// ACT
			await userResource.getUser(456, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: getUser', 'User not found');
			expect(mockResponse.status).toHaveBeenCalledWith(404);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'User not found' });
		});

		it('should return 500 if undefined error', async () => {
			// ARRANGE
			mockUserService.getUserByStaffNumber.mockRejectedValue(new Error('Unexpected error'));

			// ACT
			await userResource.getUser(789, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: getUser', 'Unexpected error');
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});

	describe('postUser', () => {
		it('should return 201 when user is created successfully', async () => {
			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockLogger.debug).toHaveBeenCalledWith(`Calling \`postUser\``);
			expect(mockLogger.info).toHaveBeenCalledWith('User added');
			expect(mockResponse.status).toHaveBeenCalledWith(201);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User added: 123' });
		});

		it('should return 500 when a known error occurs', async () => {
			// ARRANGE
			mockUserService.postUser.mockRejectedValue(new HttpError(500, ErrorEnum.CREATING));

			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: postUser', { err: 'Failed to create' });
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error. Failed to create.' });
		});

		it('should return 500 when an unexpected/unknown error occurs', async () => {
			// ARRANGE
			mockUserService.postUser.mockRejectedValue(new HttpError(500, 'Unexpected err'));

			// ACT
			await userResource.createUser(mockUser, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: postUser', { err: 'Unexpected err' });
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error. Unknown error.' });
		});
	});
});
