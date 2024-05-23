import { TaskPriority } from "../../Domain/Entities/Task";
import { ITask } from "../../Domain/Ports/ITask";

export class UpdateTaskUseCase {
    constructor(readonly repository:ITask){}

    async run(uuid:string, title?:string, description?:string, priority?:TaskPriority, notificationTime?:Date) {
        return await this.repository.update(uuid, title, description, priority, notificationTime);
    }
}