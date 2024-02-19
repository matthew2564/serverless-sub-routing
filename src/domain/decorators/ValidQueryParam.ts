import { createParamDecorator } from 'routing-controllers';
import { CustomError } from '../models/CustomError';

export function ValidQueryParam(param: string, validationFormat: RegExp) {
    return createParamDecorator({
        required: true,
        value: ({ response }) => {
            const value = response.req.query[param];

            if (!value) {
                throw new CustomError(`Missing required parameter: \`${param}\``, 400);
            }

            if (!validationFormat.test(value)) {
                throw new CustomError(`Invalid format for parameter: \`${param}\``, 400);
            }

            return value;
        },
    });
}
