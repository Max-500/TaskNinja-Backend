import { DatabaseConfig } from "../../Database/IDatabaseConfig";
import { MySQLConfig } from "../../Database/MySQL/MySQLConfig";
import { CreateTaskUseCase } from "../Application/UseCase/CreateTaskUseCase";
import { DeleteTaskUseCase } from "../Application/UseCase/DeleteTaskUseCase";
import { GetTaskUseCase } from "../Application/UseCase/GetTaskUseCase";
import { GetTasksUseCase } from "../Application/UseCase/GetTasksUseCase";
import { LoginUserUseCase } from "../Application/UseCase/LoginUserUseCase";
import { LogoutUserUseCase } from "../Application/UseCase/LogoutUserUseCase";
import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { UpdateTaskUseCase } from "../Application/UseCase/UpdateTaskUseCase";
import { CreateTaskController } from "./Controllers/CreateTaskController";
import { DeleteTaskController } from "./Controllers/DeleteTaskController";
import { GetTaskController } from "./Controllers/GetTaskController";
import { GetTasksController } from "./Controllers/GetTasksController";
import { LoginUserController } from "./Controllers/LoginUserController";
import { LogoutUserController } from "./Controllers/LogoutUserController";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { UpdateTaskController } from "./Controllers/UpdateTaskController";
import { TaskMySQLRepository } from "./Repositories/MySQL/TaskMySQLRepository";
import { UserMySQLRepository } from "./Repositories/MySQL/UserMySQLRepository";

export type DatabaseType = 'MySQL';
const dbType: DatabaseType = 'MySQL';

function getDatabaseConfig(): DatabaseConfig {
    if (dbType === 'MySQL') {
      return new MySQLConfig();
    }
    throw new Error('Unsupported repository type');
}

const dbConfig = getDatabaseConfig();
dbConfig.initialize().then(() => {
  console.log('Database initialized.')
});

const userRepository:UserMySQLRepository = new UserMySQLRepository();
const taskRepository:TaskMySQLRepository = new TaskMySQLRepository();

const createTaskUseCase:CreateTaskUseCase = new CreateTaskUseCase(taskRepository);
const deleteTaskUseCase:DeleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const getTaskUseCase:GetTaskUseCase = new GetTaskUseCase(taskRepository);
const updateTaskUseCase:UpdateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const getAllTasksUseCase:GetTasksUseCase = new GetTasksUseCase(taskRepository);

const registerUserUseCase:RegisterUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase:LoginUserUseCase = new LoginUserUseCase(userRepository);
const logoutUserUseCase:LogoutUserUseCase = new LogoutUserUseCase(userRepository);

export const createTaskController:CreateTaskController = new CreateTaskController(createTaskUseCase);
export const deleteTaskController:DeleteTaskController = new DeleteTaskController(deleteTaskUseCase);
export const getTaskController:GetTaskController = new GetTaskController(getTaskUseCase);
export const updateTaskController:UpdateTaskController = new UpdateTaskController(updateTaskUseCase);
export const getAllTaskController:GetTasksController = new GetTasksController(getAllTasksUseCase);
export const registerUserController:RegisterUserController = new RegisterUserController(registerUserUseCase);
export const loginUserController:LoginUserController = new LoginUserController(loginUserUseCase);
export const loguoutUserController:LogoutUserController = new LogoutUserController(logoutUserUseCase);