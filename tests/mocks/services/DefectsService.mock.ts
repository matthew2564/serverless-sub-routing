import { Service } from 'typedi';

@Service()
export class DefectsServiceMock {
	getDefectList = jest.fn();
}
