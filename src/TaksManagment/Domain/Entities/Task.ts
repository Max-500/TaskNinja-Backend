import { v4 as uuidv4 } from 'uuid';

export enum TaskState {
    Pending = 'pending',
    Completed = 'completed',
    Cancelled = 'cancelled'
}

export enum TaskPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export class Task {
    uuid:string;
    title:string;
    description:string;
    state: TaskState;
    priority: TaskPriority;
    notificationTime: Date;

    constructor(title:string, description:string, state: TaskState, priority:TaskPriority, notificationTime:Date){
        this.uuid = this.generateUuid();
        this.title = title;
        this.description = description;
        this.state = state;
        this.priority = priority;
        this.notificationTime = notificationTime;
    }

    generateUuid():string {
        return uuidv4();
    }
}