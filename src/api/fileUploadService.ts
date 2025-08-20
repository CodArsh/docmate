import axios from "axios";

const API_URL = "http://192.168.1.59:8080/file"; // change to your server

export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();

    formData.append("filename", file.name); // backend expects filename
    formData.append("file", {
      uri: file.uri,
      type: file.type || "application/octet-stream", // fallback
      name: file.name,
    });

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Upload failed:", error.message);
    throw error;
  }
};
