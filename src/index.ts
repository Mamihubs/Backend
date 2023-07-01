import { Request, Response } from "express";
import express from "express"
import cors from "cors"
import env from "dotenv"
import bodyParser from "body-parser"

env.config();

// Connect DB
import "./utils/connectDB"

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routers
import authRouter from "./routes/authRoutes"


// Middlewares

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    console.log("Just to make sure it's all running.")
})

// Start Server on port 8080
const server = app.listen(process.env.PORT, function(){
    console.log("App started on port: ", process.env.PORT)
})