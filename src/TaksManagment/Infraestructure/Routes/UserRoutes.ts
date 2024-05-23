import { Router } from "express";
import { loginUserController, loguoutUserController, registerUserController } from "../Dependencies";

export const router:Router = Router();

router.post("/", registerUserController.run.bind(registerUserController));

router.post("/login", loginUserController.run.bind(loginUserController));

router.post("/:uuid/logout", loguoutUserController.run.bind(loguoutUserController));