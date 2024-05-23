import { TaskModel } from "../../TaksManagment/Infraestructure/Models/MySQL/TaskModelMySQL";
import { UserModel } from "../../TaksManagment/Infraestructure/Models/MySQL/UserModelMySQL";

TaskModel.belongsTo(UserModel, { foreignKey: 'userUUID', targetKey: 'uuid', as: 'user' }); // Cada tarea pertenece a un usuario
UserModel.hasMany(TaskModel, { foreignKey: 'userUUID', sourceKey: 'uuid', as: 'tasks' }); // Cada usuario tiene muchas tareas