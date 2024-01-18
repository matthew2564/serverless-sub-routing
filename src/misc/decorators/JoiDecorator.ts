import { Response, NextFunction } from 'express';
import { ObjectSchema, ValidationErrorItem } from 'joi';
import { ErrorEnum } from '../../enums/Error.enum';

export function ValidateSchema<T>(schema: ObjectSchema) {
	return function (_target: T, _propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (body: T, res: Response, next: NextFunction) {
			// just to be safe, check the bodies existence before attempting to validate it
			if (!body) {
				return res.status(400).json({ message: 'No request body detected' });
			}

			// validate the request body against the schema passed in
			const { error } = schema.validate(body, { abortEarly: false });

			// if an error exists, then return a 400 with details
			if (error) {
				return res.status(400).json({
					message: ErrorEnum.VALIDATION,
					errors: error.details.map(({ message }: ValidationErrorItem) => message),
				});
			}

			// proceed with attached method if no error
			return originalMethod.apply(this, [body, res, next]);
		};
	};
}
