import { Service } from 'typedi';

@Service()
export class UserServiceMock {
	getUserByStaffNumber = jest.fn();
	postUser = jest.fn();
}
