import { Container } from 'typedi';
import { DefectsProvider } from '../../../src/providers/DefectsProvider';
import { DefectsProviderMock } from '../../mocks/providers/DefectsProvider.mock';
import { DefectsService } from '../../../src/services/DefectsService';
import { DefectSchemaWithId } from '../../../src/domain/models/defects/Defect.model';

jest.mock('../../../src/providers/DefectsProvider');

describe('DefectsService', () => {
	let mockService: DefectsService;
	let mockProvider: jest.Mocked<DefectsProvider>;
	const mockDefects = [
		{ id: 1, imNumber: 6 },
		{ id: 2, imNumber: 3 },
		{ id: 3, imNumber: 8 },
	] as DefectSchemaWithId[];

	beforeEach(() => {
		// set the mock implementation
		Container.set(DefectsProvider, new DefectsProviderMock());

		// get the mock from the container
		mockProvider = Container.get(DefectsProvider) as jest.Mocked<DefectsProvider>;

		// inject the mock provider into the service
		mockService = new DefectsService(mockProvider);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getDefectList', () => {
		it('should get all defects and then sort by imNumber whilst removing the id field', async () => {
			// ARRANGE
			mockProvider.getAllDefects.mockResolvedValue(mockDefects);

			// ACT
			const result = await mockService.getDefectList();

			// ASSERT
			expect(mockProvider.getAllDefects).toHaveBeenCalled();
			expect(result).toEqual([{ imNumber: 3 }, { imNumber: 6 }, { imNumber: 8 }]);
		});
	});
});
