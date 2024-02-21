import { Router } from "express";
import likedItemController from "../controllers/likedItemController";


const likedRoute = Router()


likedRoute.get("/:id", likedItemController.fetchLikeItem)
likedRoute.post("/", likedItemController.createLikeItem)
likedRoute.delete("/:id", likedItemController.removeLikeItem)


export default likedRoute;