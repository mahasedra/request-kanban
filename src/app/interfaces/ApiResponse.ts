import { IToken } from "./Token";

/**
 * Default Response
 */
export interface IApiResponse {
    success: boolean;
    message?: string;
}

/**
 * Token Response
 */
export interface IApiTokenResponse extends IApiResponse {
    data: IToken;
}
