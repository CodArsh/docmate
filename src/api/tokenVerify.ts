import BaseSetting from '../config/settings';
import { postRequest } from './apiHelper';

export interface TokenPayload {
    token: any;
}
export interface TokenResponse {
    status: number;
    message: string;
}

export const tokenVerify = async (payload: TokenPayload): Promise<TokenResponse> => {
    try {
        const params = {
            token: payload.token,
        }
        const response = await postRequest<TokenResponse>(
            BaseSetting.endpoints.tokenVerify,
            params,
        );
        return response;
    } catch (error: any) {
        console.log('Token Error:', error);
        throw error;
    }
};
