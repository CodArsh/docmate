import BaseSetting from "../config/settings"
import { deleteRequest } from "./apiHelper"

interface deleteResponse {
    status: number;
    message: string
}
export const deleteFileService = async (id: any) => {
    try {
        const response = await deleteRequest<deleteResponse>(`${BaseSetting.endpoints.deleteFile}/${id}`)
        return response;
    } catch (error: any) {
        console.log('Error while delete file ', error.message)
    }
}