import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../Database/MySQL/Database";
import { TaskPriority, TaskState } from "../../../Domain/Entities/Task";

export class TaskModel extends Model {
    uuid!:string;
    title!:string;
    description!:string;
    state!:TaskState;
    priority!:TaskPriority;
    userUUID!:string;
    notificationTime?:Date|null;
}

TaskModel.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    state: { type: DataTypes.ENUM(...Object.values(TaskState)), defaultValue: TaskState.Pending },
    priority: { type: DataTypes.ENUM(...Object.values(TaskPriority)), defaultValue: TaskPriority.Low },
    notificationTime: { 
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            isDate: {
                args: true,
                msg: 'Notification time must be a valid date'
            }
        }
    },
    userUUID: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false }
}, { sequelize, modelName: 'tasks', timestamps: false });