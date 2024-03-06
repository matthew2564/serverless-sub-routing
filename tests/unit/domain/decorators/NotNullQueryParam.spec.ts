import { NotNullQueryParam } from '../../../../src/domain/decorators/NotNullQueryParam';
import { CustomError } from '../../../../src/domain/models/CustomError';

// Simulate a response object with a query parameter
const responseMock = (paramName: string) => ({
	req: {
		query: {
			[paramName]: 'paramValue',
		},
	},
});

// Mock createParamDecorator from 'routing-controllers'
jest.mock('routing-controllers', () => ({
	createParamDecorator: jest.fn().mockImplementation((config) => config.value({ response: responseMock('paramName') })),
}));

describe('NotNullQueryParam', () => {
	const paramValue = 'testValue';

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should not throw error if param name is defined', () => {
		try {
			const decorator = NotNullQueryParam('paramName');

			expect(decorator).toEqual('paramValue');
		} catch (e) {
			fail('Should not throw error when param is defined.');
		}
	});
	it('should throw custom error due to missing value', () => {
		try {
			const decorator = NotNullQueryParam('otherParam');

			expect(decorator).toEqual(paramValue);
		} catch (e) {
			expect(e).toBeInstanceOf(CustomError);
			expect((e as Error)?.message).toEqual('Missing required parameter: `otherParam`');
		}
	});
});
