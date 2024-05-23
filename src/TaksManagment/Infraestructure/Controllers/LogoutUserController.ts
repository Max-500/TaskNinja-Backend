import { Request, Response } from "express";
import { LogoutUserUseCase } from "../../Application/UseCase/LogoutUserUseCase";

export class LogoutUserController {
    constructor(readonly useCase:LogoutUserUseCase){}

    async run(req:Request, res:Response){
        const response = await this.useCase.run(req.params.uuid);
        return res.status(response.status).json(response);
    }
}