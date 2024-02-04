import jwt, { Secret , TokenExpiredError} from 'jsonwebtoken';

export default class JwtAuth {
    protected secret_key: Secret = process.env.JWT_SECRET as Secret;

    // jwt token verifications
    public verifyJWT = (token: string) => {
      //     try {
      //   return jwt.verify(token, this.secret_key) as Record<string, unknown>;
      // } catch (error) {
      //   if (error instanceof TokenExpiredError) {
      //     console.error('JWT Expired:', error.message);
      //   } else {
      //     console.error('JWT Verification Error:');
      //   }
      // }
         return jwt.verify(token, this.secret_key) as Record<string, unknown>;
    }

    // create jwt token
    public createJWT = (payload: object): string => {
        console.log(payload)
        console.log(this.secret_key) 
        return jwt.sign(payload, this.secret_key, {
            expiresIn: '1 days',
        });
    }

    generateBearerToken(userId: string){
        return jwt.sign({
          // exp: Math.floor(Date.now() / 1000) + 3600,
          data: userId,
        }, process.env.JWT_SECRET as string);
    }
}
