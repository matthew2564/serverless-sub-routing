import { createParamDecorator } from 'routing-controllers';
import { CustomError } from '../models/CustomError';

export function NotNullQueryParam(param: string) {
	return createParamDecorator({
		required: true,
		value: ({ response }) => {
			const value = response.req.query[param];
			if (!value) {
				throw new CustomError(`Missing required parameter: \`${param}\``, 400);
			}
			return value;
		},
	});
}
