import { postRequest } from "./apiHelper";
import BaseSetting from "../config/settings";

export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();

    formData.append("filename", file.name); // backend expects filename
    formData.append("file", {
      uri: file.uri,
      type: file.type || "application/octet-stream", // fallback
      name: file.name,
    });

    const response = await postRequest(BaseSetting.endpoints.uploadFile, formData,
      // @ts-ignore
      { isMultipart: true }
    )

    return response;
  } catch (error: any) {
    console.error("Upload failed:", error.message);
    throw error;
  }
};
