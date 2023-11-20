import { JsonController, Param, Get } from 'routing-controllers';
import { UserService } from "../services/UserService";

@JsonController('/users')
export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    @Get('/:staffNumber')
    async getUser(@Param('staffNumber') staffNumber: string) {
        return await this.userService.getUserByStaffNumber(staffNumber);
    }
}
