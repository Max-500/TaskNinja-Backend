import { ITask } from "../../Domain/Ports/ITask";

export class GetTasksUseCase {
    constructor(readonly repository:ITask){}

    async run() {
        return await this.repository.getAllTask();
    }
}