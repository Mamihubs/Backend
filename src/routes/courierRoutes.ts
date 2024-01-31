import express from "express";



const router = express.Router();







router.post("/getDestinations", CourierController.getDestinations)