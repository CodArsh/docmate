import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderBar from "rn-soft-headerbar";
import styles from "./styles";

const Upload = () => {
  const [fileName, setFileName] = useState<string>("No file selected");

  const handleSelectFile = () => {
    setFileName("example_document.pdf");
  };

  const handleUpload = () => {
    alert("File Uploaded Successfully 🚀");
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title='Upload file' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} />
      <View style={styles.container}>

        <View style={styles.card}>
          {/* Title */}
          <Text style={styles.title}>Upload Your File</Text>

          {/* File Name Field */}
          <View style={styles.inputBox}>
            <Icon name="insert-drive-file" size={22} color="#007AFF" />
            <Text style={styles.fileName}>{fileName}</Text>
          </View>

          {/* Select File Button */}
          <TouchableOpacity style={styles.selectBtn} onPress={handleSelectFile}>
            <Icon name="attach-file" size={20} color="#fff" />
            <Text style={styles.selectText}>Select File</Text>
          </TouchableOpacity>

          {/* Upload Button */}
          <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
            <Icon name="cloud-upload" size={22} color="#fff" />
            <Text style={styles.uploadText}>Upload Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}
export default Upload


