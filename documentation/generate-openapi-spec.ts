import 'reflect-metadata';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import fs from 'fs/promises';
import { name, version } from '../package.json';
import { app } from '../src';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

const filePath = './documentation/openapi-spec.json';

async function deleteFileIfExists() {
	try {
		// Check if the file exists
		await fs.access(filePath);
		// If no error is thrown by fs.access, the file exists, so delete it
		await fs.unlink(filePath);
	} catch (error) {
		// An error in fs.access means the file does not exist, so no need to delete
		if ((error as NodeJS.ErrnoException)?.code !== 'ENOENT') {
			throw error;
		}
		// we want to 'ignore' the ENOENT error so throw if anything else
	}
}

(async () => {
	await deleteFileIfExists();

	// Generate the OpenAPI spec
	const spec = routingControllersToSpec(getMetadataArgsStorage(), app, {
		openapi: '3.1.0',
		info: {
			title: name,
			version,
		},
		components: {
			schemas: {
				// This will auto-detect all the 'class-validator' schema definitions and add them to the OpenAPI spec
				...validationMetadatasToSchemas({ refPointerPrefix: '#/components/schemas/' }),

				// Here you can specify the schemas that are used to build your API spec, they key should match
				// up with the `documentation/responses.ts` file where a dynamic schema name is used
				// MySchema: require('path-to-schema/index.json'),

				// Or you can define the schemas by hand ...
				UserGet: {
					properties: {},
				},
				UserPost: {
					properties: {
						message: {
							type: 'string',
							description: 'A message including the staff number of the user created.',
						},
					},
				},
				Version: {
					properties: {
						name: {
							type: 'string',
							description: 'A service name identifier.',
						},
						buildDateTime: {
							type: 'string',
							description: 'The date and time of the request, formatted as DD/MM/YYYY HH:mm.',
						},
						version: {
							type: 'string',
							description: 'The version identifier.',
						},
					},
				},
			},
		},
		tags: [
			{
				name: 'Users',
				description: 'API endpoints related to users',
			},
		],
	});

	// Convert the spec to a JSON string
	const specString = JSON.stringify(spec, null, 2);

	// Write the spec to a file
	await fs.writeFile(filePath, specString).then(() => {
		console.log('OpenAPI spec generated at ./documentation/openapi-spec.json');
	});
})();
