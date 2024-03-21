import fsN, { existsSync, readFileSync } from 'fs';
import { build, BuildOptions } from 'esbuild';
import { esbuildDecorators } from 'esbuild-plugin-typescript-decorators';
import * as path from 'node:path';
const [majorNodeVersion] = readFileSync('.nvmrc', 'utf-8').trim().split('.');

const coreBuildOptions: BuildOptions = {
	bundle: true,
	minify: true,
	sourcemap: process.argv.includes('--source-map'),
	logLevel: 'info',
	platform: 'node',
	target: `node${majorNodeVersion}`,
	external: ['@koa/*', '@babel/*'],
	plugins: [esbuildDecorators()],
};

async function buildAPI() {
	console.log('\x1b[36m%s\x1b[0m', '\nStarting API proxy build.');

	const proxyDir = path.join(__dirname, 'src', 'proxy');

	// Check if the proxy directory exists
	if (!existsSync(proxyDir)) {
		console.log('\x1b[91m%s\x1b[0m', "No 'src/proxy' directory found. Skipping proxy build.");
		return;
	}

	await build({
		entryPoints: ['src/proxy/index.ts'],
		outfile: 'dist/src/proxy/index.js',
		...coreBuildOptions,
	});

	console.log('\x1b[36m%s\x1b[0m', '\nAPI proxy built successfully.');
}

async function buildFunctions() {
	console.log('\x1b[36m%s\x1b[0m', '\nStarting functions build(s).');

	const functionsDir = path.join(__dirname, 'src', 'functions');

	// Check if the functions directory exists
	if (!existsSync(functionsDir)) {
		console.log('\x1b[91m%s\x1b[0m', "No 'src/functions' directory found. Skipping function build.");
		return;
	}

	const directories = fsN
		.readdirSync(functionsDir, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	// Bundle each folder within functions
	for (const dir of directories) {
		const entryPoint = path.join(functionsDir, dir, 'handler.ts');
		const outdir = path.join(__dirname, 'dist', 'functions', dir);

		await build({
			entryPoints: [{ in: entryPoint, out: 'index' }],
			outdir,
			...coreBuildOptions,

			// exclude the packages needed for the API proxying
			external: ['cors', 'express', 'routing-controllers', 'serverless-http'],
		});
	}

	console.log('\x1b[36m%s\x1b[0m', '\nFunction build(s) successful.');
}

(async () => {
	try {
		// not using Promise.all so we maintain log order
		await buildAPI();
		await buildFunctions();
	} catch {
		process.exit(1);
	}
})();
