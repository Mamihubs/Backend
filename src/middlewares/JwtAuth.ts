import jwt, { Secret } from 'jsonwebtoken';

export default class JwtAuth {
    protected secret_key: Secret = process.env.SECRET_KEY as Secret;

    // jwt token verifications
    public verifyJWT = (token: string): Record<string, unknown> => {
        return jwt.verify(token, this.secret_key) as Record<string, unknown>;
    }

    // create jwt token
    public createJWT = (payload: object): string => {
        return jwt.sign(payload, this.secret_key, {
            expiresIn: '1 days',
            algorithm: 'RS256'
        });
    }
}
