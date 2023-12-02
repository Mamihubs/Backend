import { Request, Response } from "express";
// model importation
import User, { getUserByEmail, updateUserInfo } from "../models/User";
import { createProfile } from "../models/Profile";
import { createToken, deleteUserToken, getUserToken } from "../models/Token";
//importing field validations
import { userRegistrationValidation, passwordResetValidation } from "../validations/authValidations";
import { GeneralUtils } from "../utils/general"
import bcrypt from "bcryptjs"
class AuthController {

    private salt:number; //defining the generic salt
    constructor() {
        this.salt = 10;
    }

    userRegistration = async (req: Request, res: Response) => {
        // Data Validation
        const { error } = userRegistrationValidation(req.body)
        if (error) {
            return res.status(400).json({
                error: true,
                message: error.details[0].message.toUpperCase(),
            })
        }

        // Check out user in the Database
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                error: true,
                message: "User Already Exist"
            })
        }

        const userObj = {
            fullName: req.body.firstName + " " + req.body.lastName,
            login: req.body.email,
            password: await bcrypt.hash(req.body.password, this.salt)
        }

        // create new User in the db
        const user = await User.create(userObj)

        // Post user creation actions go below
        const created_profile = await createProfile({ email: req.body.email })

        if (created_profile)
            return res.status(200).json({
                error: false,
                message: `user created successfully `
            });
    }

    sendResetPasswordToken = async (req: Request, res: Response) => {
        // destructure 
        const { email } = req.body;
        if (!email)
            return res.status(400).json({
                error: true,
                message: "email address required"
            })

        try {
            // check that the user is registered first
            const checkExistance = await getUserByEmail(email);
            if (!checkExistance)
                return res.status(400).json({
                    error: true,
                    message: "user does not exist"
                })

            // initiate the email and OTP class  
            const utils = new GeneralUtils();
            const token = utils.generateOtp();

            // create the reset password token
            const created_token = createToken({ token, user_id: checkExistance?._id });
            if (!created_token) return res.status(500).json({
                error: true,
                message: "reset token creation failed try again"
            });

            // send the token to the user
            const sent = utils.sendEmail(checkExistance?.login, 'MAMIHUB PASSWORD RESET TOKEN', `your password reset code is: \n ${token}`);
            if (!sent) return res.status(500).json({
                error: true,
                message: "sending otp for password link failed"
            });

            return res.status(200).json({
                error: false,
                message: `check your email address ${checkExistance?.login} for the reset code, note that the code expires in 5 minutes `
            });
        } catch (err) {
            console.log(err)
        }

    }


    resetPassword = async (req: Request, res: Response) => {

        const { error } = passwordResetValidation(req.body)
        // a check that the token, email, and password fields are not empty
        if (error) {
            console.log(error)
            return res.status(400).json({
                error: true,
                message: error.details[0].message.toUpperCase(),
            })
        }

        try {
            // destructure the body parameters
            const { token, email, password } = req.body;

            // check that the user is registered first
            const checkMailExist = await getUserByEmail(email);
            if (!checkMailExist)
                return res.status(400).json({
                    error: true,
                    message: `user with the email address ${email} does not exist`
                });

            // check that the reset password token has not expired
            const checkTokenExist = await getUserToken(checkMailExist._id, token);
            if (!checkTokenExist)
                return res.status(400).json({
                    error: true,
                    message: "token expired"
                });

            //reset the password and delete the token
            const encrypted_password = await bcrypt.hash(password, 10)
            const updated = updateUserInfo(checkMailExist._id, { password: encrypted_password });
            await deleteUserToken(checkTokenExist?._id);

            // check if the users password is updated or not 
            if (!updated) return res.status(400).json({ status: false, message: 'password reset failed try again' })
            return res.status(200).json({
                error: false,
                message: "password reset successfully"
            });
        } catch (err) {
            console.log(err)
        }


    }

}

export default new AuthController();