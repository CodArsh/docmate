import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderBar from "rn-soft-headerbar";
import styles from "./styles";

type FileItem = {
  id: string;
  fileName: string;
  createdAt: string;
  type: string;
  size: string;
};

const files: FileItem[] = [
  {
    id: "1",
    fileName: "Document.pdf",
    createdAt: "2025-08-18 10:30 AM",
    type: "PDF",
    size: "2.3 MB",
  },
  {
    id: "2",
    fileName: "Image.png",
    createdAt: "2025-08-17 5:20 PM",
    type: "PNG",
    size: "1.2 MB",
  },
  {
    id: "3",
    fileName: "Presentation.pptx",
    createdAt: "2025-08-15 3:45 PM",
    type: "PPTX",
    size: "5.8 MB",
  },
];

const History = ()=> {
  const renderItem = ({ item }: { item: FileItem }) => (
    <View style={styles.card}>
      {/* File Info */}
      <View style={styles.infoRow}>
        <Icon name="insert-drive-file" size={30} color="#3e4a57ff" style={{opacity:0.9}} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.fileName}>{item.fileName}</Text>
          <Text style={styles.meta}>
            {item.type} • {item.size}
          </Text>
          <Text style={styles.date}>Uploaded on {item.createdAt}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="file-download" size={22} color="#007AFF" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="open-in-new" size={22} color="#007AFF" />
          <Text style={styles.actionText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="share" size={22} color="#007AFF" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (

    <View style={{ flex: 1 }}>
      <HeaderBar title='History' backgroundColor='#007AFF' textColor='#fff' rightIcon={<Icon name="logout" size={22} color={'#fff'} />} />
      <View style={styles.container}>
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>

  );
}

export default History

