import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    filesOuter: {
        padding: 20
    },
    container: {
        paddingVertical: Dimensions.get('screen').height / 20,
        width: "48%",
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: "#ccc",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    recentContainer: {
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 15,
        backgroundColor: '#fff',
        paddingVertical: 15,
         shadowColor: "#ccc",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5,
    }
})

export default styles