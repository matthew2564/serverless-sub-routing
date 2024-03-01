export class AWSPowerToolsLoggerMock {
	static factory = {
		Logger: {
			addPersistentLogAttributes: jest.fn(),
			debug: jest.fn(),
			info: jest.fn(),
			error: jest.fn(),
		},
	};
}
