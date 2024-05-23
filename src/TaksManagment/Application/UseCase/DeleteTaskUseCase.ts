import { ITask } from "../../Domain/Ports/ITask";

export class DeleteTaskUseCase {
    constructor(readonly repository:ITask){}

    async run(uuid:string) {
        return await this.repository.delete(uuid);
    }
}