/**
 * Json Web Token
 */
export interface IToken {
    token: string;
}

export interface IJwtPayload {
    id: number;
    pseudo: string;
    exp: number;
    iat: number;
}
