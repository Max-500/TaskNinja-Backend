import { ITask } from "../../Domain/Ports/ITask";

export class GetTaskUseCase {
    constructor(readonly repository:ITask){}

    async run(uuid:string) {
        return await this.repository.getTask(uuid);
    }
}