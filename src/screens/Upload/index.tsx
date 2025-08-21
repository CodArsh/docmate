import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { pick } from "@react-native-documents/picker";
import { uploadFile } from "../../api/fileUploadService";
import HeaderBar from "rn-soft-headerbar";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import ToastBox from 'react-native-simple-toast';


const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const handlePick = async () => {
    try {
      setLoading(true);
      const files = await pick({
        // @ts-ignore
        multiple: false,
      });

      if (!files || files.length === 0) {
        ToastBox.show('No file selected', 10)
        setLoading(false);
        return;
      }

      const file = files[0];
      setFileInfo(file);
      console.log("Picked file:", file);

    } catch (error: any) {
      console.error("Error picking :", error);
      ToastBox.show(error.message, 10)
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const result = await uploadFile(fileInfo, (p) => setProgress(p)) as { message: string };
      console.log("Upload response:", result);
      ToastBox.show(result.message, 10);
    } catch (error: any) {
      console.error("Error uploading:", error);
      ToastBox.show(error.message, 10);
    } finally {
      setLoading(false);
      setFileInfo(null);
      setProgress(0)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title='Upload file' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} />
      <View style={styles.container}>

        <View style={styles.card}>
          {/* Title */}
          <Text style={styles.title}>Upload Your File</Text>

          {/* File Name Field */}
          {
            fileInfo?.name && <View style={styles.inputBox}>
              <Icon name="insert-drive-file" size={22} color="#007AFF" />
              <Text style={styles.fileName}>{fileInfo?.name}</Text>
            </View>
          }


          {/* Select File Button */}
          <TouchableOpacity style={styles.selectBtn} onPress={handlePick}>
            <Icon name="attach-file" size={20} color="#fff" />
            <Text style={styles.selectText}>Select File</Text>
          </TouchableOpacity>

          {/* Upload Button */}
          <TouchableOpacity disabled={fileInfo === null || progress > 0} style={[styles.uploadBtn, {
            backgroundColor: fileInfo === null || progress > 0 ? '#9c9898ff' : '#34C759'
          }]} onPress={handleUpload}>
            <Icon name="cloud-upload" size={22} color="#fff" />
            <Text style={styles.uploadText}>{progress > 0 && progress < 100 ? `Uploading... ${progress}%` : `Upload Now`}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default Upload;
