import { Response, Request, NextFunction } from "express";
import VerificationCode from "../models/VerificationCode";
import User from "../models/User";
import mongoose from "mongoose";
import { UserService } from "../services/user.service";
import { GeneralUtils } from "../utils/general";
import { sendConfirmationEmail, verificationEmail } from "../utils/mailer";
import { getUserToken } from "../models/Token";
import { VerificationCodeService } from "../services/verificationcode.service";
import { VerificationCodeRepository } from "../repository/VerificationCodeRepository";
import {
  createVerificationCodeValidation,
  verifyCodeValidation,
} from "../validations/verificationCodeValidations";

const { Types } = mongoose;

const verificationCodeRepo = new VerificationCodeRepository();
const general = new GeneralUtils();
const userService = new UserService();
const verificationCodeService = new VerificationCodeService(
  verificationCodeRepo
);

export const generateCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Data Validation
  const { error } = createVerificationCodeValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.toUpperCase(),
    });
  }

  const user = await userService.getOneUser("login", req.body.email);
  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User Not Found!",
    });
  }
  if (user.status === "Active") {
    return res.status(400).json({
      error: true,
      message: "Your account is already Verified",
    });
  }

  const CodeGenerated = await verificationCodeService.getOneCode(
    "user",
    user._id
  );
  // const codeGenerated = getUserToken(req.body.user, token:);
  if (
    CodeGenerated &&
    CodeGenerated.maxAge > Date.now() - CodeGenerated.createdAt.getTime()
  ) {
    return res.status(401).json({
      error: true,
      message: "Code has been sent Already, retry after 5mins",
    });
  } else if (
    CodeGenerated &&
    CodeGenerated.maxAge <= Date.now() - CodeGenerated.createdAt.getTime()
  ) {
    await verificationCodeService.deleteOneCode(CodeGenerated._id);

    // Create Code
    const code = {
      user: user._id,
      code: general.generateOtp(),
    };

    verificationEmail(code.code, user)
      .then(() => {
        const newCode = new VerificationCode(code);
        newCode.save();
        return res.status(200).json({
          success: true,
          message: "Verification Code sent Successfully",
        });
      })
      .catch((e) => {
        return res.status(401).json({
          error: true,
          message: "Error sending Verification code :(",
        });
      });
  } else {
    // Create Code
    const code = {
      user: user._id,
      code: general.generateOtp(),
    };

    verificationEmail(code.code, user)
      .then(() => {
        const newCode = new VerificationCode(code);
        newCode.save();
        return res.status(200).json({
          success: true,
          message: "Verification Code sent Successfully",
        });
      })
      .catch((e) => {
        console.log(e);

        return res.status(401).json({
          error: true,
          message: "Error sending Verification code :(",
        });
      });
  }
};

// Verify User
export const verifyUser = async (req: Request, res: Response) => {
  // Data Validation
  const { error } = verifyCodeValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.toUpperCase(),
    });
  }

  const user = await userService.getOneUser("login", req.body.email);
  if (!user) {
    return res.status(400).json({
      error: true,
      message: "User Not Found!",
    });
  }
  if (user.status === "Active") {
    return res.status(400).json({
      error: true,
      message: "Your account is already Verified",
    });
  }

  const codeExist = await VerificationCode.findOne({
    code: req.body.code,
    user: user._id,
  });
  if (!codeExist) {
    return res.status(400).json({
      error: true,
      message: "Used or Unauthorized Code :)",
    });
  } else if (
    codeExist &&
    codeExist.maxAge <= Date.now() - codeExist.createdAt.getTime()
  ) {
    await VerificationCode.deleteOne({ _id: codeExist._id });
    return res.status(400).json({
      error: true,
      message: "Code expired!, Request New code",
    });
  }

  const changeVerificationStatus = {
    status: "Active",
  };

  const id = user._id
  User.updateOne({ _id: id }, { $set: changeVerificationStatus })
    .then(async () => {
      VerificationCode.deleteOne({ code: req.body.code, user: user._id })
        .then(async () => {
          const userInfo = await User.findOne({ _id: user._id });
          return res.status(200).json({
            success: true,
            message:
              "Your account has been verified successfully!",
            userInfo,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({
            error: true,
            message: "Verification Success but code Not deleted",
          });
        });
    })
    .catch((_) => {
      return res.status(400).json({
        error: true,
        message: "Verification Failed",
      });
    });
};
