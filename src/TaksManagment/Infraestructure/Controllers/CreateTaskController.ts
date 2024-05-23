import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../Application/UseCase/CreateTaskUseCase";
import { Task } from "../../Domain/Entities/Task";
import { parseTasksArray, validateTasksArray } from "../Helpers/Function";

export class CreateTaskController {
    constructor(readonly useCase:CreateTaskUseCase){}

    async run(req:Request, res:Response) {
        if(!validateTasksArray(req.body.data)) {
            return res.status(400).send({ message: "Error al parsear los datos" });
        }
        
        const response = await this.useCase.run(parseTasksArray(req.body.data), req.body.userUUID);
        return res.status(response.status).json(response);
    }
}