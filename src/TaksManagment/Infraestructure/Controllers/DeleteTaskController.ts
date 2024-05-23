import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../Application/UseCase/DeleteTaskUseCase";

export class DeleteTaskController {
    constructor(readonly useCase:DeleteTaskUseCase){}

    async run(req:Request, res:Response) {
        const response:any = await this.useCase.run(req.params.uuid);
        return res.status(response.status).json(response);
    }
}