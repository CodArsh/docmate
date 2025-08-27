import { useState } from "react";
import ToastBox from "react-native-simple-toast";
import { fetchHistoryList } from "../api/fetchHistoryList";
import { deleteFileService } from "../api/deleteFileService";
import { downloadFile } from "../api/downloadFileService";
import { shareFileService } from "../api/shareFileService";
import { fetchSharedList } from "../api/fetchSharedService";

export const useFileActions = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  const getFilesList = async () => {
    try {
      const response = await fetchHistoryList();
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      ToastBox.show("Error while fetching files list", 10);
    } finally {
      setRefreshing(false);
    }
  };

  const getFetchSharedList = async () => {
    try {
      const response = await fetchSharedList();
      if (response.status === 200) {
        setFiles(response.data);
      }
    } catch (error) {
      ToastBox.show("Error while fetching files list", 10);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await deleteFileService(id);
      if (response?.status === 200) {
        ToastBox.show(response?.message, 10);
        getFilesList();
      }
    } catch (error) {
      ToastBox.show("File not deleted", 10);
    }
  };

  const handleShare = async (item: any) => {
    try {
      const response = await shareFileService(item);
      if (response?.status === 200) {
        ToastBox.show(response?.message, 10);
      }
    } catch (error) {
      ToastBox.show("File not shared", 10);
    }
  };

  const handleDownload = async (id: string, name: string) => {
    console.log('check ', id, name)
    try {
      setDownloadingIds((prev) => [...prev, id]);
      setDownloadProgress((prev) => ({ ...prev, [id]: 0 }));

      const result = await downloadFile(id, name, (p) =>
        setDownloadProgress((prev) => ({ ...prev, [id]: p }))
      );
      console.log("reson: ", result)

      if (result.success) {
        ToastBox.show(`✅ Downloaded: ${name}`, 10);
      } else {
        ToastBox.show(`${result.error}`, 10);
      }
    } catch (error) {
      ToastBox.show("Error while downloading", 10);
    } finally {
      setDownloadingIds((prev) => prev.filter((d) => d !== id));
    }
  };

  return {
    files,
    refreshing,
    setRefreshing,
    downloadingIds,
    downloadProgress,
    getFilesList,
    getFetchSharedList,
    handleDelete,
    handleDownload,
    handleShare
  };
};
