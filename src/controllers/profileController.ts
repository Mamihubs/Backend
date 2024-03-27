import { Request, Response } from "express";
// model basic crud importation
import {
  getProfileByEmail,
  updateProfile,
  getProfiles,
  deleteProfile,
} from "../models/Profile";
//importing field validations
import { profileValidation } from "../validations/authValidations";
import { storeDataInCacheMemory } from "../interceptors";
import { UserService } from "../services/user.service";
import { updateUserInfo } from "../models/User";
import bcrypt from "bcryptjs";

const userService = new UserService();

class ProfileController {
  updateUserProfile = async (req: Request, res: Response) => {
    try {
      // data validations
      const { email } = req.params;
      const { password, new_password, ...rest } = req.body;
      // check if profile exists
      const checkExistance = await getProfileByEmail(email);
      if (!checkExistance)
        return res.status(400).json({
          error: true,
          message: "user account not created",
        });
      // check if the password matches
      const user = await userService.getOneUser("login", req.body.email);
      if (!user) {
        return res.status(403).json({
          status: false,
          message: "Incorrect credentials",
        });
      }
      const isMatched = await user.matchPassword(password)
      if (!isMatched) {
        return res.status(403).json({
          status: false,
          message: "Incorrect credentials",
        });
      }

      // update user password
      const hashPassword = await bcrypt.hash(new_password, 10)
      await updateUserInfo(user._id, {password: hashPassword})

      // update user profile
      const updatedProfile = await updateProfile(email, {
        ...rest,
        active: true,
      });
      if (!updatedProfile) {
        return res
          .status(400)
          .json({ status: false, message: "Profile update failed" });
      }
      return res.status(200).json({
        error: false,
        message: "user profile updated",
      });
    } catch (err) {
      console.log(err);
    }
  };

  getUserProfile = async (req: Request, res: Response) => {
    const { email } = req.params;
    if (!email)
      return res.status(400).json({
        error: true,
        message: "email required to get user information",
      });

    try {
      // call the service to get user using the getProfileByEmail function
      const data = await getProfileByEmail(email);
      if (!data)
        return res.status(400).json({
          error: true,
          message: "user profile information not created",
        });
      // store cache in memory
      storeDataInCacheMemory(req, { message: "success", data }, 10);
      // return the user information
      return res.status(200).json({ message: "success", data });
    } catch (err) {
      return res
        .status(500)
        .json({
          message:
            "Sorry an error occurred, trying to process request. Try again later",
        });
    }
  };
  // delete a usr profile
  deleteUserProfile = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
      if (!email)
        return res.status(400).json({
          error: true,
          message: "email required to get user information",
        });
      const deleted = deleteProfile(email);

      if (!deleted)
        return res.status(400).json({
          error: true,
          message: "user profile not deleted",
        });

      // return the user information
      return res.status(200).json({
        error: false,
        message: "user's profile deleted",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get all the users profiles
  // applicable to admin
  getUsersProfile = async (req: Request, res: Response) => {
    const data = await getProfiles();
    // store cache in memory
    storeDataInCacheMemory(req, data, 10);
    return res.status(200).json(data);
  };
}

export default new ProfileController();
