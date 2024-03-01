export class DateMock {
	static factory = {
		...jest.requireActual('@dvsa/cvs-microservice-common/classes/utils/date'),
		DateTime: jest
			.fn()
			.mockImplementation(() => ({
				// Mock instance method 'format' when instantiating with new
				format: jest.fn().mockReturnValue('Mocked Instance Format'),
			}))
			.mockImplementationOnce(() => ({
				at: jest.fn().mockReturnValue({
					format: jest.fn().mockReturnValue('Mocked Static Format'),
				}),
			})),
	};
}
