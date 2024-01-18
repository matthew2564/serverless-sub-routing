import { Service } from 'typedi';

@Service()
export class UserProviderMock {
	findUserRecord = jest.fn();
	postUserRecord = jest.fn();
}
