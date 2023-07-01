import jwt from "jsonwebtoken"

export const generateBearerToken = (userId: string) => {
    return jwt.sign({
        // exp: Math.floor(Date.now() / 1000) + 3600,
        data: userId,
    }, process.env.JWT_SECRET as string);
}