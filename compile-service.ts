import { readFileSync } from 'fs';
import { build } from 'esbuild';
import { esbuildDecorators } from 'esbuild-plugin-typescript-decorators';
const [majorNodeVersion] = readFileSync('.nvmrc', 'utf-8').trim().split('.');

(async () => {
	try {
		await build({
			entryPoints: ['src/index.ts'],
			bundle: true,
			keepNames: true,
			minify: true,
			logLevel: 'info',
			platform: 'node',
			target: `node${majorNodeVersion}`,
			outfile: 'dist/lambda.js',
			external: ['@koa/*', '@babel/*'],
			plugins: [esbuildDecorators()],
		});

		console.log('\x1b[36m%s\x1b[0m', '\nProject compiled successfully.');
	} catch {
		process.exit(1);
	}
})();
