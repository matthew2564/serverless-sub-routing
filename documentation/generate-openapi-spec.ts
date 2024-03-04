import 'reflect-metadata';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { app } from '../src';

// Generate the OpenAPI spec
const spec = routingControllersToSpec(getMetadataArgsStorage(), app, {
	components: {
		schemas: {
			DefectDetails: require('@dvsa/cvs-type-definitions/json-schemas/v1/defect-details/index.json'),
			RequiredStandards: require('@dvsa/cvs-type-definitions/json-schemas/required-standards/defects/get/index.json'),
		},
	},
	tags: [
		{
			name: 'Defects',
			description: 'API endpoints related to defects',
		},
	],
});

// Convert the spec to a JSON string
const specString = JSON.stringify(spec, null, 2);

const filePath = './documentation/openapi-spec.json';

// Check if the file exists
if (existsSync(filePath)) {
	console.log('Deleting existing OpenAPI spec');
	// If the file exists, delete it
	unlinkSync(filePath);
}

// Write the spec to a file
writeFileSync(filePath, specString);

console.log('OpenAPI spec generated at openapi-spec.json');
