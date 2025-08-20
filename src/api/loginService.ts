import BaseSetting from '../config/settings';
import { postRequest } from './apiHelper';

export interface LoginPayload {
    email: string;
    password: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    data?: any;
    token: string
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const params = {
            email: payload.email,
            password: payload.password
        }
        const response = await postRequest<LoginResponse>(
            BaseSetting.endpoints.login,
            params,
        );
        return response;
    } catch (error: any) {
        console.log('Login Error:', error.message);
        throw error;
    }
};
