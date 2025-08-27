import BaseSetting from "../config/settings"
import { getRequest } from "./apiHelper"

export interface FetchSharedResponse {
    status: number;
    data: any;
}
export const fetchSharedList = async (): Promise<FetchSharedResponse> => {
    try {
        const response = await getRequest<FetchSharedResponse>(BaseSetting.endpoints.shareFile)
        return response
    } catch (error: any) {
        console.log('Fetch shared Error:', error.message);
        throw error;
    }
}