import { Service } from 'typedi';

@Service()
export class VersionServiceMock {
	getVersion = jest.fn();
}
