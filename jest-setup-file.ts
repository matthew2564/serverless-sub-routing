import 'reflect-metadata';

import { TypeDIMock } from './tests/mocks/packages/typedi.mock';
import { AWSPowerToolsLoggerMock } from './tests/mocks/packages/power-tools-logger.mock';

jest.mock('typedi', () => TypeDIMock.factory);
jest.mock('@aws-lambda-powertools/logger', () => AWSPowerToolsLoggerMock.factory);

jest.mock('@dvsa/cvs-microservice-common/classes/utils/date', () => {
	const originalModule = jest.requireActual('@dvsa/cvs-microservice-common/classes/utils/date');

	// Mock the DateTime class
	const MockedDateTime = jest.fn().mockImplementation((...args) => {
		return {
			...new originalModule.DateTime(...args),
			format: jest.fn().mockReturnValue('Mocked Date'),
		};
	});

	// @ts-expect-error -  Mock the static 'at' method
	MockedDateTime.at = jest.fn().mockImplementation((sourceDateTime, format) => {
		const instance = new originalModule.DateTime(sourceDateTime, format);
		// Assuming 'format' is an instance method that should be available after calling 'at'
		instance.format = jest.fn().mockReturnValue('Mocked Formatted Date');
		return instance;
	});

	return {
		...originalModule,
		DateTime: MockedDateTime,
	};
});
