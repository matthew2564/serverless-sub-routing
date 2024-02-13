import { NextFunction, Response } from 'express';
import { ErrorEnum } from '../enums/Error.enum';
import { BodyParser } from '../helpers/body-parser';

export function ValidateJSON<T>(validate: (body: T) => { valid: boolean; error?: string }) {
	return function (_target: object, _propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (body: T, res: Response, next: NextFunction) {
			// just to be safe, check the bodies existence before attempting to validate it
			if (!body) {
				return res.status(400).json({ message: 'No request body provided.' });
			}

			const payload = BodyParser<object>(body);

			// check after decoding that the body is not empty
			if (Object.keys(payload).length === 0) {
				return res.status(400).json({
					message: ErrorEnum.VALIDATION,
					error: 'Empty request.',
				});
			}

			// if not empty, then use the parsed payload and pass into the function to validate it
			const { valid, error } = validate(payload as T);

			if (!valid) {
				return res.status(400).json({
					message: ErrorEnum.VALIDATION,
					error,
				});
			}

			// proceed with attached method if no error
			return originalMethod.apply(this, [body, res, next]);
		};
	};
}
