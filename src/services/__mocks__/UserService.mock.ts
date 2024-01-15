import { Service } from 'typedi';

@Service()
export class UserServiceMock {
	// method stubs
	getUserByStaffNumber = jest.fn();
}
