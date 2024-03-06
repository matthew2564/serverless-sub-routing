import { createParamDecorator } from 'routing-controllers';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { CustomError } from '../models/CustomError';

export function NotNullQueryParam(param: string) {
	return createParamDecorator({
		required: true,
		value: ({ response }) => {
			const value = response.req.query[param];
			if (!value) {
				throw new CustomError(`Missing required parameter: \`${param}\``, HttpStatus.BAD_REQUEST);
			}
			return value;
		},
	});
}
