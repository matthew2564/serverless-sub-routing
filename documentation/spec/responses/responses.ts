import { ErrorEnum } from '../../../src/domain/enums/Error.enum';

export class OpenAPISpecResponses {
	// left as a function call to allow variables schemas to be bound to response
	static OK = (schema?: string) => {
		let contentSchema = {};

		// Defined a `content` property, that contains a schema object and a pointer to the schema itself
		// the name of the schema needs to tie up to the `documentation/openapi-spec.json` file
		switch (schema) {
			// These are not consolidated further to ensure that there is flexibility to add/amend configuration
			case 'UserGet':
				contentSchema = {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: `#/components/schemas/${schema}`,
							},
						},
					},
				};
				break;
			case 'Version':
				contentSchema = {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								$ref: `#/components/schemas/${schema}`,
							},
						},
					},
				};
				break;
			default:
				contentSchema = {};
				break;
		}

		return {
			description: 'OK',
			...contentSchema,
		};
	};

	static CREATED = {
		description: 'Created',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					$ref: `#/components/schemas/UserPost`,
				},
			},
		},
	};

	static NOT_FOUND = {
		description: ErrorEnum.NOT_FOUND,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						message: {
							type: 'string',
							example: ErrorEnum.NOT_FOUND,
						},
					},
				},
			},
		},
	};

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
