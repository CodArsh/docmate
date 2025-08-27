import React, { useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderBar from "rn-soft-headerbar";
import styles from "./styles";
import FileCard from "../../components/CardList/CardList";
import { useFileActions } from "../../hooks/useFileActions";
import { useDispatch } from "react-redux";
import { showLogoutModal } from "../../redux/slices/logoutSlice";

type FileItem = {
  _id: string;
  filename: string;
  createdAt: string;
  type: string;
  size: any;
};

const History = () => {
  const {
    files,
    refreshing,
    downloadingIds,
    downloadProgress,
    setRefreshing,
    getFetchSharedList,
    handleDelete,
    handleDownload,
    handleShare
  } = useFileActions();


  useEffect(() => {
    getFetchSharedList()
  }, [])
  const dispatch = useDispatch()

  const renderItem = ({ item }: { item: FileItem }) => (
    <FileCard
      item={item}
      downloadingIds={downloadingIds}
      downloadProgress={downloadProgress}
      handleDownload={handleDownload}
      handleDelete={handleDelete}
      handleShare={handleShare}
      history
    />
  );

  return (

    <View style={{ flex: 1 }}>
      <HeaderBar
        shadow
        title='History'
        backgroundColor='#007AFF'
        textColor='#fff'
        onRightPress={() => dispatch(showLogoutModal())}
        rightIcon={<Icon name="logout" size={22} color={'#fff'}
        />

        }
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              colors={['#007AFF', '#df6666ff', '#97ce00ff']}
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                getFetchSharedList();
              }}
            />
          }
        />
      </View>
    </View>

  );
}

export default History

