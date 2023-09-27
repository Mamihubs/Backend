import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";
import JwtAuth from "./JwtAuth";
import {UserService} from "../services/user.service";

//  authorization : access token
class AuthenticateUser extends UserService{
    private jwtAuth: JwtAuth = new JwtAuth();

    public deserialToken = async (req: Request, res: Response, next: NextFunction) => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }else if (req.cookies) {
            token = req.cookies.access_token;
        }

        if (!token) {
            return res.status(401).json({ message: "Auth Token required"});
        }

        const decoded =  this.jwtAuth.verifyJWT(token) as { _id: string, role:string};

        if (!decoded)
            return res.status(401).json({ message: "Invalid token or user doesn't exist"});


        // Check if user exist
        const user = await this.getOneUser("_id", decoded._id);
        if (!user)
            return res.status(401).json({ message: "User with that token no longer exists" });
        req.user = user._id;
        next()
    }

    public checkUserAuth = (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user)
                return next(new CustomError("AUthentication required", 403));
            next();
        } catch (err) {
            next(err);
        }
    }

    public restictedTo = (...alloweddRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!alloweddRoles.includes(user.role))
            return next(new CustomError("User not permitted", 403));
        next();
    }
}

export default new AuthenticateUser()