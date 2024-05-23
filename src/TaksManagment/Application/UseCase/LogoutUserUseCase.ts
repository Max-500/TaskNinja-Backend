import { IUser } from "../../Domain/Ports/IUser";

export class LogoutUserUseCase {
    constructor(readonly repository:IUser){}

    async run(uuid:string) {
        return await this.repository.logout(uuid);
    }
}