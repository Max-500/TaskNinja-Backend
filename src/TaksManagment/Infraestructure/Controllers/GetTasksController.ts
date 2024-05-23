import { Request, Response } from "express";
import { GetTasksUseCase } from "../../Application/UseCase/GetTasksUseCase";

export class GetTasksController {
    constructor(readonly useCase:GetTasksUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.useCase.run();
        return res.status(response.status).json(response);
    }
}