import { Service } from 'typedi';

@Service()
export class DefectsProviderMock {
	getAllDefects = jest.fn();
	private static get tableName() {
		return jest.fn();
	}
}
