import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderBar from "rn-soft-headerbar";
import styles from "./styles";
import { fetchHistoryList } from "../../api/fetchHistoryList";
import ToastBox from 'react-native-simple-toast';
import moment from 'moment'
import { truncateText } from "../../utils/truncateText";
import { formatFileSize } from "../../utils/formatFileSize";
import { deleteFileService } from "../../api/deleteFileService";
import { downloadFile } from "../../api/downloadFileService";

type FileItem = {
  _id: string;
  filename: string;
  createdAt: string;
  type: string;
  size: string;
};

const History = () => {

  const [files, setFiles] = useState()
  const [refreshing, setRefreshing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);


  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = async () => {
    try {
      const response = await fetchHistoryList()
      if (response.status === 200) {
        setFiles(response.data)
      }
    } catch (error) {
      ToastBox.show('Error while history list ', 10)
    } finally {
      setRefreshing(false)
    }
  }

  const handleDelete = async (id: any) => {
    try {
      const response = await deleteFileService(id)
      if (response?.status === 200) {
        ToastBox.show(response?.message, 10)
        getHistory()
      }
    } catch (error) {
      ToastBox.show('File not deleted', 10)
    }
  }

  const handleDownload = async (id: string, name: string) => {
    try {
      setDownloadingIds((prev) => [...prev, id]);
      setDownloadProgress((prev) => ({ ...prev, [id]: 0 }));

      const result = await downloadFile(id, name, (p) =>
        setDownloadProgress((prev) => ({ ...prev, [id]: p }))
      );

      if (result.success) {
        ToastBox.show(`✅ Downloaded: ${name}`, 10);
      } else {
        ToastBox.show(`❌ ${result.error}`, 10);
      }
    } catch (error) {
      ToastBox.show('❌ Error while downloading', 10);
    } finally {
      setDownloadingIds((prev) => prev.filter((d) => d !== id)); // remove from active downloads
    }
  };


  const renderItem = ({ item }: { item: FileItem }) => (
    <View style={styles.card}>
      {/* File Info */}
      <View style={styles.infoRow}>
        <Icon name="insert-drive-file" size={30} color="#3e4a57ff" style={{ opacity: 0.9 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "93%" }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.fileName}>{truncateText(item.filename)}</Text>
            <Text style={styles.meta}>
              {item.type} • {formatFileSize(item.size)}
            </Text>
            <Text style={styles.date}>Uploaded on: {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}</Text>
          </View>
          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleDownload(item._id, item.filename)}
            >
              {downloadingIds?.includes(item._id) ? (
                <View>
                  <Text style={{ color: 'green', fontWeight: 'bold' }}>
                    {downloadProgress[item._id] || 0}%
                  </Text>
                </View>
              ) : (
                <Icon name="file-download" size={26} color="#007AFF" />
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.actionBtn} disabled={downloadingIds?.includes(item._id)}>
              <Icon name="share" size={26} color={downloadingIds?.includes(item._id) ? '#b0b0b0ff' : "#007AFF"} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.actionBtn} disabled={downloadingIds?.includes(item._id)} onPress={() => handleDelete(item?._id)} >
              <Icon name="delete" size={26} color={downloadingIds?.includes(item._id) ? '#b0b0b0ff' : "#df6666ff"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );

  return (

    <View style={{ flex: 1 }}>
      <HeaderBar title='History' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl colors={['#007AFF', '#df6666ff', '#97ce00ff']} refreshing={refreshing} onRefresh={() => (setRefreshing(true), getHistory())} />
          }
        />
      </View>
    </View>

  );
}

export default History

