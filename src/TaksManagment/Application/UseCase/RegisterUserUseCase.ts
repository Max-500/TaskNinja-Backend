import { User } from "../../Domain/Entities/User";
import { IUser } from "../../Domain/Ports/IUser";

export class RegisterUserUseCase {
    constructor(readonly repository:IUser){}

    async run(user:User) {
        return await this.repository.register(user);
    }
}