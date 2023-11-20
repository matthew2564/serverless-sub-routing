import {Service} from "typedi";
import {NotFoundError} from "routing-controllers";
import {UserRepository} from "../repositories/UserRepository";

@Service()
export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUserByStaffNumber(staffNumber: string): Promise<void> {
        const user = await this.userRepository.findUserRecord(staffNumber);

        if (!user) {
            throw new NotFoundError(`User with staff number ${staffNumber} not found`);
        }
    }
}
