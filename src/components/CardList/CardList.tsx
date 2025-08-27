import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { formatFileSize } from "../../utils/formatFileSize";
import { truncateText } from "../../utils/truncateText"

type FileCardProps = {
    item: any
    downloadingIds: string[];
    downloadProgress: Record<string, number>;
    handleDownload: (id: string, filename: string) => void;
    handleDelete: (id: string) => void;
    handleShare: (item: any) => void;
    history?: any
};

const FileCard: React.FC<FileCardProps> = ({
    item,
    downloadingIds,
    downloadProgress,
    handleDownload,
    handleDelete,
    handleShare,
    history
}) => {
    return (
        <View style={styles.card}>
            <View style={[styles.infoRow, { marginBottom: history ? 0 : 12 }]}>
                <Icon
                    name="insert-drive-file"
                    size={30}
                    color="#3e4a57ff"
                    style={{ opacity: 0.9 }}
                />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "93%",
                    }}
                >
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.fileName}>{history ? truncateText(item?.file?.filename) : truncateText(item?.filename)}</Text>
                        <Text style={styles.meta}>
                            {history ? item?.file?.type : item?.type} • {history ? formatFileSize(item?.file?.size) : formatFileSize(item.size)}
                        </Text>

                        {
                            history ? <Text style={styles.date}>
                                To: {item?.receivedEmail}
                            </Text> : <Text style={styles.date}>
                                Uploaded on: {moment(item?.createdAt).format("DD MMM YYYY, hh:mm A")}
                            </Text>
                        }

                    </View>

                    {/* Actions */}
                    {
                        !history && <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => handleDownload(item._id, item.filename)}
                            >
                                {downloadingIds?.includes(item._id) ? (
                                    <Text style={{ color: "green", fontWeight: "bold" }}>
                                        {downloadProgress[item._id] || 0}%
                                    </Text>
                                ) : (
                                    <Icon name="file-download" size={26} color="#16a02fb9" />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleShare(item)} style={styles.actionBtn} disabled={downloadingIds?.includes(item._id)}>
                                <Icon name="share" size={23} color={downloadingIds?.includes(item._id) ? '#b0b0b0ff' : "#007bffa4"} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionBtn}
                                disabled={downloadingIds?.includes(item._id)}
                                onPress={() => handleDelete(item._id)}
                            >
                                <Icon
                                    name="delete"
                                    size={26}
                                    color={
                                        downloadingIds?.includes(item._id) ? "#b0b0b0ff" : "#df6666b5"
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default FileCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#ccc",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
        marginTop: 15
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    fileName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3e4a57ff",
    },
    meta: {
        fontSize: 14,
        color: "#555",
        marginTop: 2,
    },
    date: {
        fontSize: 12,
        color: "gray",
        marginTop: 1,
    },
    actions: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-end",
        marginTop: 10,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 25
    },
    actionText: {
        fontSize: 14,
        marginLeft: 5,
        color: "#007AFF",
        fontWeight: "500",
    },
});
