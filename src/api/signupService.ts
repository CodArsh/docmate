// signupService.ts
import { postRequest } from './apiHelper';

export interface SignupPayload {
    name: string;
    number: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    success: boolean;
    message: string;
    data?: any; // Adjust according to backend response
}

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
    try {
        // const formData = new FormData();
        // formData.append('name', payload.name);
        // formData.append('number', payload.number);
        // formData.append('email', payload.email);
        // formData.append('password', payload.password);
        // console.log('object', formData);

        const params = {
            name: payload.name,
            number: payload.number,
            email: payload.email,
            password: payload.password,
        }
        console.log('object', params)
        const response = await postRequest<SignupResponse>(
            '/signup', // 👈 replace with your actual endpoint
            params
        );

        return response;
    } catch (error: any) {
        console.error('Signup Error:', error);
        throw error;
    }
};
