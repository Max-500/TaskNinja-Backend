import { Task } from "../../Domain/Entities/Task";
import { ITask } from "../../Domain/Ports/ITask";

export class CreateTaskUseCase {
    constructor(readonly repository:ITask){}

    async run(tasks:Task[], userUUID:string) {
        return await this.repository.create(tasks, userUUID);
    }
}