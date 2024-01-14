import { build } from 'esbuild';
import { readFileSync } from 'fs';
const [majorNodeVersion] = readFileSync('.nvmrc', 'utf-8').trim().split('.');

(async () => {
	try {
		await build({
			entryPoints: ['src/index.ts'],
			bundle: true,
			minify: true,
			logLevel: 'info',
			platform: 'node',
			target: `node${majorNodeVersion}`,
			outfile: 'dist/lambda.js',
			external: ['@koa/*', '@babel/*'],
		});

		console.log('\x1b[32m%s\x1b[0m', '\nArtifact build completed.');
	} catch {
		process.exit(1);
	}
})();
