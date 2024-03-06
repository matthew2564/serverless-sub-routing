import { BadRequestError } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi';
import { DefectsServiceMock } from '../../mocks/services/DefectsService.mock';
import { LOGGER } from '../../../src/domain/di-tokens/Tokens';
import { Logger } from '@aws-lambda-powertools/logger';
import { AWSPowerToolsLoggerMock } from '../../mocks/packages/power-tools-logger.mock';
import { ExpressMock } from '../../mocks/packages/express.mock';
import { DefectsResource } from '../../../src/resources/DefectsResource';
import { DefectsService } from '../../../src/services/DefectsService';
import { RequiredStandardsService } from '../../../src/services/RequiredStandardsService';
import { RequiredStandardsServiceMock } from '../../mocks/services/RequiredStandardsService.mock';
import { DefectDetailsSchema } from '@dvsa/cvs-type-definitions/types/v1/defect-details';
import { EUVehicleCategory } from '@dvsa/cvs-type-definitions/types/required-standards/defects/enums/euVehicleCategory.enum';
import {
	DefectGETRequiredStandards,
	RequiredStandardTaxonomySection,
} from '@dvsa/cvs-type-definitions/types/required-standards/defects/get';
import { HttpStatus } from '@dvsa/cvs-microservice-common/api/http-status-codes';
import { ErrorEnum } from '../../../src/domain/enums/Error.enum';

jest.mock('../../../src/services/DefectsService');
jest.mock('../../../src/services/RequiredStandardsService');

describe('DefectsResource', () => {
	let defectsResource: DefectsResource;
	let mockDefectsService: jest.Mocked<DefectsService>;
	let mockRequiredStandardsService: jest.Mocked<RequiredStandardsService>;
	let mockLogger: jest.Mocked<Logger>;
	const mockResponse: Partial<Response> = ExpressMock.factory;
	const mockDefect = {} as DefectDetailsSchema;
	const mockEuVehicleCategory = 'm1' as keyof typeof EUVehicleCategory;
	const mockRequiredStandard = {
		basic: [] as RequiredStandardTaxonomySection[],
		normal: [] as RequiredStandardTaxonomySection[],
	} as DefectGETRequiredStandards;

	beforeEach(() => {
		// set the mock implementation
		Container.set(DefectsService, new DefectsServiceMock());
		Container.set(RequiredStandardsService, new RequiredStandardsServiceMock());
		Container.set(LOGGER, AWSPowerToolsLoggerMock.factory.Logger);

		// get the mock services from the container
		mockDefectsService = Container.get(DefectsService) as jest.Mocked<DefectsService>;
		mockRequiredStandardsService = Container.get(RequiredStandardsService) as jest.Mocked<RequiredStandardsService>;
		mockLogger = Container.get(LOGGER) as jest.Mocked<Logger>;

		// inject the mock service into the resource
		defectsResource = new DefectsResource(mockDefectsService, mockRequiredStandardsService, mockLogger);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getDefects', () => {
		it('should return 200 when defects are found', async () => {
			// ARRANGE
			mockDefectsService.getDefectList.mockResolvedValue([mockDefect, mockDefect]);

			// ACT
			await defectsResource.getDefects(mockResponse as Response);

			// ASSERT
			expect(mockLogger.debug).toHaveBeenCalledWith(`Calling \`getDefectList\``);
			expect(mockLogger.info).toHaveBeenCalledWith('2 defects found');
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
			expect(mockResponse.json).toHaveBeenCalledWith([mockDefect, mockDefect]);
		});

		it('should return 500 if undefined error', async () => {
			// ARRANGE
			const error = new Error('Unexpected error');
			mockDefectsService.getDefectList.mockRejectedValue(error);

			// ACT
			await defectsResource.getDefects(mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: getDefects', { err: error });
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});

	describe('getRequiredStandards', () => {
		it('should return 200 when required standards are found', async () => {
			// ARRANGE
			mockRequiredStandardsService.getByEUVehicleCategory.mockResolvedValue(mockRequiredStandard);

			// ACT
			await defectsResource.getRequiredStandards(mockEuVehicleCategory, mockResponse as Response);

			// ASSERT
			expect(mockLogger.addPersistentLogAttributes).toHaveBeenCalledWith({ euVehicleCategory: mockEuVehicleCategory });
			expect(mockLogger.debug).toHaveBeenCalledWith(`Calling \`getByEUVehicleCategory\``);
			expect(mockLogger.info).toHaveBeenCalledWith('Required standards found', { basic: 0, normal: 0 });
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
			expect(mockResponse.json).toHaveBeenCalledWith(mockRequiredStandard);
		});

		it('should return 400 when the service throws a bad request due to unrecognised vehicle category', async () => {
			// ARRANGE
			const error = new BadRequestError('Invalid cat');
			mockRequiredStandardsService.getByEUVehicleCategory.mockRejectedValue(error);

			// ACT
			await defectsResource.getRequiredStandards(mockEuVehicleCategory, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: getRequiredStandards', { err: error });
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
			expect(mockResponse.send).toHaveBeenCalledWith({
				message: ErrorEnum.VALIDATION,
				detail: 'Invalid cat',
			});
		});

		it('should return 500 if undefined error', async () => {
			// ARRANGE
			mockRequiredStandardsService.getByEUVehicleCategory.mockRejectedValue(new Error('Unexpected error'));

			// ACT
			await defectsResource.getRequiredStandards(mockEuVehicleCategory, mockResponse as Response);

			// ASSERT
			expect(mockLogger.error).toHaveBeenCalledWith('[ERROR]: getRequiredStandards', {
				err: new Error('Unexpected error'),
			});
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
			expect(mockResponse.send).toHaveBeenCalledWith({ message: 'Internal server error' });
		});
	});
});
