import BaseSetting from "../config/settings"
import { postRequest } from "./apiHelper"

interface shareResponse {
    status: number;
    message: string
}
export const shareFileService = async (item: any) => {
    try {
        const response = await postRequest<shareResponse>(`${BaseSetting.endpoints.shareFile}`, item)
        return response;
    } catch (error: any) {
        console.log('Error while sharing file ', error.message)
    }
}