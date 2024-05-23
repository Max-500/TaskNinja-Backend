import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../Application/UseCase/RegisterUserUseCase";
import { dataToUser, validateUser } from "../Helpers/Function";

export class RegisterUserController {
    constructor(readonly useCase:RegisterUserUseCase){}

    async run(req:Request, res:Response) {
        if(!validateUser(req.body)){
            return res.status(400).send({ message: "Error al parsear" })
        }

        const response = await this.useCase.run(dataToUser(req.body));
        return res.status(response.status).json(response);
    }
}