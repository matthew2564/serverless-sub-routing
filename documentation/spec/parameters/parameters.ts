import { ParameterObject, ReferenceObject } from 'openapi3-ts/src/model/OpenApi';

export class OpenAPISpecParams {
	static PARAMS: {
		RequiredStandards: (ParameterObject | ReferenceObject)[];
	} = {
		RequiredStandards: [
			{
				name: 'euVehicleCategory',
				in: 'query',
				required: true,
				schema: {
					type: 'string',
				},
			},
		],
	};
}
