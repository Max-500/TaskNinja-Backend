import { Task, TaskState, TaskPriority } from "../../../Domain/Entities/Task";
import { ITask } from "../../../Domain/Ports/ITask";
import { TaskModel } from "../../Models/MySQL/TaskModelMySQL";

export class TaskMySQLRepository implements ITask {
    async create(tasks: Task[], uuid: string): Promise<any> {
        try {
            const failedTasks: any[] = [];
            const promises: Promise<TaskModel>[] = tasks.map((task: Task) => {
                return TaskModel.create({
                    uuid: task.uuid,
                    title: task.title,
                    description: task.description,
                    state: task.state,
                    priority: task.priority,
                    notificationTime:task.notificationTime,
                    userUUID: uuid
                });
            })

            const results = await Promise.allSettled(promises);

            const createdTasks = results.map(result => {
                if (result.status === 'fulfilled') {
                    return result.value.toJSON();
                } else {
                    const task = tasks.find(task => task.uuid === result.reason.uuid);
                    if (!task) return
                    failedTasks.push({
                        uuid: task.uuid,
                        title: task.title,
                        error: result.reason.message
                    });
                    return;
                }
            });

            return {
                status: 201,
                createdTasks,
                failedTasks
            };
        } catch (error) {
            return {
                status: 500,
                error
            }
        }
    }

    async update(uuid: string, title?: string, description?: string, priority?: TaskPriority, notificationTime?:Date): Promise<any> {
        try {
            const task = await TaskModel.findByPk(uuid);

            if (!task) {
                return {
                    status: 404,
                    message: 'Task not found'
                };
            }    

            if (title !== undefined) task.title = title;
            if (description !== undefined) task.description = description;
            if (priority !== undefined) task.priority = priority;
            if (notificationTime !== undefined) task.notificationTime = notificationTime;
    
            await task.save();
    
            return {
                status: 200,
                message: 'Task updated successfully',
                data: task
            };
    
        } catch (error) {
            return {
                status: 500,
                error
            }
        }

    }


    async delete(uuid: string): Promise<any> {
        try {
            const task = await TaskModel.findByPk(uuid);

            if (!task) {
                return {
                    status: 404,
                    message: 'Task not found'
                };
            }

            await task.destroy();

            return {
                status: 200,
                message: 'Task was destroy successfully'
            }
        } catch (error) {
            return {
                status: 500,
                error
            }
        }
    }

    async getTask(uuid: string): Promise<any> {
        try {
            const task = await TaskModel.findByPk(uuid);

            if (!task) {
                return {
                    status: 404,
                    message: 'Task not found'
                };
            }

            return {
                status: 200,
                data: task.toJSON()
            }
        } catch (error) {
            return {
                status: 500,
                error
            }
        }
    }

    async getAllTask(): Promise<any> {
        try {
            const tasks = await TaskModel.findAll();

            return {
                status: 200,
                data: tasks
            }
        } catch (error) {
            return {
                status: 500, 
                error
            }
        }
    }

}