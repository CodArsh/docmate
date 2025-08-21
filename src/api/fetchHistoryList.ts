import BaseSetting from "../config/settings"
import { getRequest } from "./apiHelper"

export interface FetchFilesResponse {
    status: number;
    data: any;
}
export const fetchHistoryList = async (): Promise<FetchFilesResponse> => {
    try {
        const response = await getRequest<FetchFilesResponse>(BaseSetting.endpoints.historyList)
        return response
    } catch (error: any) {
        console.log('Fetch Files Error:', error.message);
        throw error;
    }
}