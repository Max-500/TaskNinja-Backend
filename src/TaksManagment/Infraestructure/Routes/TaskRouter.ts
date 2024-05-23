import { Router } from "express";
import { createTaskController, updateTaskController, deleteTaskController, getAllTaskController, getTaskController } from "../Dependencies";

export const router:Router = Router();

router.get("/", getAllTaskController.run.bind(getAllTaskController));

router.get("/:uuid", getTaskController.run.bind(getTaskController));

router.post("/", createTaskController.run.bind(createTaskController));

router.put("/:uuid", updateTaskController.run.bind(updateTaskController));

router.delete("/:uuid", deleteTaskController.run.bind(deleteTaskController));