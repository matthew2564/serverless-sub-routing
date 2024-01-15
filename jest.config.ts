import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['./jest-setup-file.ts'],
};

export default config;
