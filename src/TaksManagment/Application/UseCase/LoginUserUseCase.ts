import { IUser } from "../../Domain/Ports/IUser";

export class LoginUserUseCase {
    constructor(readonly repository:IUser){}

    async run(email:string, password:string) {
        return await this.repository.login(email, password);
    }
}