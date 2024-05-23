import express, { Application } from "express";
import cors from "cors";
import { router as UserRouter } from "./TaksManagment/Infraestructure/Routes/UserRoutes";
import { router as TaskRouter } from "./TaksManagment/Infraestructure/Routes/TaskRouter";

const app:Application = express()
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks", TaskRouter);

const port:string = process.env.PORT || '3000';

app.listen(port, () => {
    console.log(`SERVER RUNNING IN http://localhost:${port}.`);
});