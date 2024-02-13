import { Response, NextFunction } from 'express';
import Joi from 'joi';
import { ValidateSchema } from '../JoiDecorator';

describe('ValidateSchema', () => {
	const mockResponse = () => {
		const res: Partial<Response> = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		return res as Response;
	};

	const mockNext: NextFunction = jest.fn();

	// Mock schema
	const mockSchema = Joi.object({
		name: Joi.string().required(),
	});

	it('should validate schema correctly and call next', async () => {
		const body = { name: 'Test' };
		const res = mockResponse();
		const next = mockNext;

		const decorator = ValidateSchema(mockSchema);
		const mockOriginalMethod = jest.fn();
		const descriptor = { value: mockOriginalMethod };

		decorator({}, '', descriptor);

		await descriptor.value(body, res, next);

		expect(mockOriginalMethod).toHaveBeenCalledWith(body, res, next);
		expect(res.status).not.toHaveBeenCalled();
		expect(res.json).not.toHaveBeenCalled();
	});

	it('should return an error response if body is not defined', async () => {
		const body = null; // Invalid body
		const res = mockResponse();
		const next = mockNext;

		const decorator = ValidateSchema(mockSchema);
		const mockOriginalMethod = jest.fn();
		const descriptor = { value: mockOriginalMethod };

		decorator({}, '', descriptor);

		await descriptor.value(body, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: 'No request body detected' });
		expect(mockOriginalMethod).not.toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});

	it('should return an error response if validation fails', async () => {
		const body = { name: '' }; // Invalid body
		const res = mockResponse();
		const next = mockNext;

		const decorator = ValidateSchema(mockSchema);
		const mockOriginalMethod = jest.fn();
		const descriptor = { value: mockOriginalMethod };

		decorator({}, '', descriptor);

		await descriptor.value(body, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({
				errors: ['"name" is not allowed to be empty'],
				message: 'Validation error',
			})
		);
		expect(mockOriginalMethod).not.toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});
