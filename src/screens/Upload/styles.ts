import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f1f1ff",
        padding: 20,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
        shadowColor: "#ccc",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#FAFAFA",
    },
    fileName: {
        marginLeft: 10,
        color: "#555",
        fontSize: 14,
        flexShrink: 1,
    },
    selectBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: 15,
    },
    selectText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
    },
    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderRadius: 12,
        justifyContent: "center",
    },
    uploadText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 8,
    },
});

export default styles