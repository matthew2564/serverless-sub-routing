import 'reflect-metadata';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import fs from 'fs/promises';
import { name, version } from '../package.json';
import { app } from '../src';

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
		info: {
			title: name,
			version,
		},
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

	// Write the spec to a file
	await fs.writeFile(filePath, specString).then(() => {
		console.log('OpenAPI spec generated at ./documentation/openapi-spec.json');
	});
})();
