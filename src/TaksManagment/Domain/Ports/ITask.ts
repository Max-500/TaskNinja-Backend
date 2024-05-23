import { Task, TaskPriority } from "../Entities/Task";

export interface ITask {
    create(tasks:Task[], uuid:string):Promise<Task[]|any>;
    update(uuid:string, title?:string, description?:string, priority?:TaskPriority, notificationTime?:Date):Promise<Task|any>;
    delete(uuid:string):Promise<any>;
    getTask(uuid:string):Promise<Task|any>;
    getAllTask():Promise<Task[]|any>
}