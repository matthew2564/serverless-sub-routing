import {UserRepository} from "../repositories/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserByStaffNumber(staffNumber: string) {
        return await this.userRepository.findUserRecord(staffNumber);
    }
}
