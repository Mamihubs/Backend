import { Router } from "express";
import withdrawalController from "../controllers/withdrawalController";


const withdrawRoute = Router();


withdrawRoute.post("/fund", withdrawalController.withdrawalRequest);
withdrawRoute.post("/approve", withdrawalController.withdrawalApproveFunds);


export default withdrawRoute;