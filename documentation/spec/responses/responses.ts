import { ErrorEnum } from '../../../src/domain/enums/Error.enum';

export class OpenAPISpecResponses {
	static OK = (schema: 'DefectDetails' | 'RequiredStandards') => ({
		description: 'OK',
		content: {
			'application/json': {
				schema: {
					type: 'array',
					items: {
						$ref: `#/components/schemas/${schema}`,
					},
				},
			},
		},
	});

	static INTERNAL_SERVER_ERROR = {
		description: ErrorEnum.INTERNAL_SERVER_ERROR,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: 'Internal server error',
						},
					},
				},
			},
		},
	};
}
