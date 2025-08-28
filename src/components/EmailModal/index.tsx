import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import Modal from "react-native-modal";

interface EmailModalProps {
    email: any,
    setEmail: any
    visible: boolean,
    onClose: () => void,
    onSend: () => void,
}

const EmailModal: React.FC<EmailModalProps> = ({ email, setEmail, visible, onClose, onSend }) => {

    const [error, setError] = useState("");

    // Email Regex (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSend = () => {
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        setError("");
        onSend(email);
        onClose();
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            style={styles.modal}
            avoidKeyboard
        >
            <View style={styles.container}>
                <Text style={styles.title}>Enter Email</Text>

                <TextInput
                    style={styles.input}
                    placeholder="example@mail.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSend}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: width * 0.85,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default EmailModal;
