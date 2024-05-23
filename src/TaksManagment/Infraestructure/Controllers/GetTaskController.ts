import { Request, Response } from "express";
import { GetTaskUseCase } from "../../Application/UseCase/GetTaskUseCase";

export class GetTaskController {
    constructor(readonly useCase:GetTaskUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.useCase.run(req.params.uuid);
        return res.status(response.status).json(response);
    }
}