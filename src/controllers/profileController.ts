import { Request, Response } from "express";
// model basic crud importation
import { getProfileByEmail, updateProfile, getProfiles, deleteProfile } from "../models/Profile";
//importing field validations
import { profileValidation } from "../validations/authValidations";
import { storeDataInCacheMemory } from "../interceptors";


class ProfileController {

    updateUserProfile = async (req: Request, res: Response) => {
        try {
            // data validations
            const { email } = req.params;
            // const { error } = profileValidation(req.body);
            // if (error)
            //     return res.status(400).json({
            //         error: true,
            //         message: error.details[0].message,
            //     })
            // check if the user exists
            // if the user profile's exists update the profile
            const checkExistance = await getProfileByEmail(email);
            if (!checkExistance)
                return res.status(400).json({
                    error: true,
                    message: "user account not created"
                })
            const updatedProfile = await updateProfile(email, { ...req.body, active: true }, );
            if (!updatedProfile) return res.status(400).json({ status: false, message: 'Profile update failed' })
            return res.status(200).json({
                error: false,
                message: "user profile updated"
            })
        } catch (err) {
            console.log(err)
        }
    }

    getUserProfile = async (req: Request, res: Response) => {
        const { email } = req.params;
        if (!email) return res.status(400).json({ error: true, message: "email required to get user information" })

        try {
            // call the service to get user using the getProfileByEmail function
            const data = await getProfileByEmail(email)
            if (!data)
                return res.status(400).json({
                    error: true,
                    message: "user profile information not created"
                })
            // store cache in memory
            storeDataInCacheMemory(req, {message: "success", data}, 10)
            // return the user information 
            return res.status(200).json({ message: "success", data })
        } catch (err) {
            return res.status(500).json({message: "Sorry an error occurred, trying to process request. Try again later"})
        }

    }
    // delete a usr profile 
    deleteUserProfile = async (req: Request, res: Response) => {
        const { email } = req.params;
        try {
            if (!email) return res.status(400).json({ error: true, message: "email required to get user information" })
            const deleted = deleteProfile(email)

            if (!deleted)
                return res.status(400).json({
                    error: true,
                    message: "user profile not deleted"
                })

            // return the user information 
            return res.status(200).json({
                error: false,
                message: "user's profile deleted"
            })
        } catch (error) {
            console.log(error)
        }

    }

    // get all the users profiles
    // applicable to admin
    getUsersProfile = async (req: Request, res: Response) => {
        const data = await getProfiles();
        // store cache in memory
        storeDataInCacheMemory(req, data, 10)
        return res.status(200).json(data)
    }
}

export default new ProfileController();