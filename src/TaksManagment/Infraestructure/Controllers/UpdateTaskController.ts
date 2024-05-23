import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../Application/UseCase/UpdateTaskUseCase";

export class UpdateTaskController {
    constructor(readonly useCase:UpdateTaskUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.useCase.run(req.params.uuid, req.body.title, req.body.description, req.body.priority, req.body.notificationTime);
        return res.status(response.status).json(response);
    }
}