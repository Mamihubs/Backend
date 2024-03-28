import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import env from "dotenv";
// swagger documentation
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerDocOptions from "./swagger";

//security
import helmet from "helmet";
import compression from "compression";

env.config();

// Connect DB

const app = express();
import "./utils/connectDB";

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(compression());
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
import paystackRoutes from "./routes/paystackRoutes";
import courierRoutes from "./routes/courierRoutes";
import likedRoutes from "./routes/likedItemRoute";
import withdrawRoute from "./routes/withdrawalRoutes";
import subscriberRoutes from "./routes/subscriberRoutes";

import authCheck from "./middlewares/authCheck";
import { UserType } from "./models/User";

const swaggerSpec = swaggerJSDoc(swaggerDocOptions);

// docs middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.serveWithOptions({redirect: false,  }), swaggerUi.setup(swaggerSpec));

// Middlewares
app.use("/api/auth", authRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/code", verificationCodeRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sales", salesRoutes);
app.use(
  "/api/admin",
  authCheck.deserialToken,
  authCheck.restictedTo(UserType.STAFF),
  adminRoutes
);
app.use("/api/vendors", vendorRoutes);
app.use("/api/locations", locationRouter);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/promotion-plans", promotionPlanRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/delivery-address", deliveryAddressRouter);
app.use("/api/carts", cartRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/couriers", courierRoutes);
app.use("/api/likes", likedRoutes);
app.use("/api/withdrawal", withdrawRoute);
app.use("/api/subscribers", subscriberRoutes);


app.get("/", (req: Request, res: Response) => {
  console.log("Just to make sure it's all running.");
  return res.status(200).json({
    message: "All is well",
  });
});

// Start Server on port 8081
const server = app.listen(process.env.PORT, function () {
  console.log("App started on port:", process.env.PORT);
});
