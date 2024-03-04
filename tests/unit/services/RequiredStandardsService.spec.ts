import { Container } from 'typedi';
import { RequiredStandardsService } from '../../../src/services/RequiredStandardsService';
import { RequiredStandardsProvider } from '../../../src/providers/RequiredStandardsProvider';
import { RequiredStandardsProviderMock } from '../../mocks/providers/RequiredStandardsProvider.mock';
import { BadRequestError } from 'routing-controllers';
import { ITaxonomySectionRequiredStandards } from '../../../src/domain/models/defects/ITaxonomySectionRequiredStandards';
import { IRequiredStandard } from '../../../src/domain/models/defects/RequiredStandard';
import RequiredStandards from '../../../tests/test-data/dynamo-seed-required-standards.json';

jest.mock('../../../src/providers/RequiredStandardsProvider');

describe('RequiredStandardsService', () => {
	let mockService: RequiredStandardsService;
	let mockProvider: jest.Mocked<RequiredStandardsProvider>;
	const mockRequiredStandardDynamoResponse = [
		{
			sectionNumber: '1',
			sectionDescription: 'Section 1 Description',
			requiredStandards: [
				{
					rsNumber: '001',
					requiredStandard: 'Standard 1',
					refCalculation: 'Calculation 1',
					additionalInfo: false,
					basicInspection: true,
					normalInspection: false,
				},
			] as IRequiredStandard[],
		},
	] as ITaxonomySectionRequiredStandards[];

	beforeEach(() => {
		// set the mock implementation
		Container.set(RequiredStandardsProvider, new RequiredStandardsProviderMock());

		// get the mock from the container
		mockProvider = Container.get(RequiredStandardsProvider) as jest.Mocked<RequiredStandardsProvider>;

		// inject the mock provider into the service
		mockService = new RequiredStandardsService(mockProvider);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getByEUVehicleCategory', () => {
		it('should throw BadRequestError for invalid EUVehicleCategory', async () => {
			// ARRANGE
			const invalidCategory = 'invalidCategory';

			// ACT & ASSERT
			await expect(mockService.getByEUVehicleCategory(invalidCategory)).rejects.toThrow(BadRequestError);
		});

		it('should ', async () => {
			// ARRANGE
			mockProvider.findByEUVehicleCategory.mockResolvedValue(mockRequiredStandardDynamoResponse);

			// ACT
			const result = await mockService.getByEUVehicleCategory('m1');

			// ASSERT
			expect(result).toEqual({
				basic: [
					{
						...mockRequiredStandardDynamoResponse[0],
						requiredStandards: [
							{
								additionalInfo: false,
								inspectionTypes: ['basic'],
								refCalculation: 'Calculation 1',
								requiredStandard: 'Standard 1',
								rsNumber: 1,
							},
						],
					},
				],
				euVehicleCategories: ['m1'],
				normal: [],
			});
		});

		it('should return expected number of sections upon successful result', async () => {
			// ARRANGE
			mockProvider.findByEUVehicleCategory.mockResolvedValue(RequiredStandards);

			// ACT
			const result = await mockService.getByEUVehicleCategory('m1');

			// ASSERT
			expect(result.normal.length).toBe(629);
			expect(result.basic.length).toBe(96);
			expect(result.euVehicleCategories).toEqual(['m1']);
		});

		it('should return empty lists upon successfully finding no search results', async () => {
			// ARRANGE
			mockProvider.findByEUVehicleCategory.mockResolvedValue([]);

			// ACT
			const result = await mockService.getByEUVehicleCategory('m1');

			// ASSERT
			expect(result.normal.length).toBe(0);
			expect(result.basic.length).toBe(0);
			expect(result.euVehicleCategories).toEqual(['m1']);
		});
	});
});
