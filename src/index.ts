import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";

env.config();

// Connect DB

const app = express();
import "./utils/connectDB"


// Middlewares
app.use(cors({origin:"*"}));
app.use(express.json());

// Routers
import authRouter from "./routes/authRoutes";
import profileRouter from "./routes/profileRoutes";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import verificationCodeRouter from "./routes/verificationCodeRoutes";
import categoryRouter from "./routes/categoryRoutes";
import salesRoutes from "./routes/salesRoutes";
import adminRoutes from "./routes/adminRoutes";
import locationRouter from "./routes/locationRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import onboardingRoutes from "./routes/onboardingRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import promotionPlanRoutes from "./routes/promotionPlanRoutes";
import walletRoutes from "./routes/walletRoutes";
import deliveryAddressRouter from "./routes/deliveryAddressRoute";

import cartRoutes from "./routes/cartRoutes";
import paystackRoutes from "./routes/paystackRoutes"
import courierRoutes from "./routes/courierRoutes"



// Middlewares

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/code", verificationCodeRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sales", salesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/location", locationRouter)
app.use('/api/onboarding', onboardingRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/promotion', promotionRoutes)
app.use('/api/promotion-plan', promotionPlanRoutes)
app.use('/api/wallet', walletRoutes)
app.use('/api/delivery-address', deliveryAddressRouter)

app.use("/api/cart", cartRoutes);
app.use("/api/payments/paystack", paystackRoutes)
app.use("/api/courier", courierRoutes)









app.get("/", (req: Request, res: Response) => {
    console.log("Just to make sure it's all running.")
    return res.status(200).json({
        message: "All is well"
    })
})

// Start Server on port 8081
const server = app.listen(process.env.PORT, function(){
    console.log("App started on port:", process.env.PORT)
})