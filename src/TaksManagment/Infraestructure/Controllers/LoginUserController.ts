import { Request, Response } from "express";
import { LoginUserUseCase } from "../../Application/UseCase/LoginUserUseCase";

export class LoginUserController {
    constructor(readonly useCase:LoginUserUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.useCase.run(req.body.email, req.body.password);
        return res.status(response.status).json(response);
    }
}