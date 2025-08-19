import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 14,
        shadowColor: "#ccc",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
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
        justifyContent: "space-between",
        marginTop: 10,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionText: {
        fontSize: 14,
        marginLeft: 5,
        color: "#007AFF",
        fontWeight: "500",
    },
});

export default styles 