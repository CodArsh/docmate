import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signupUser } from "../../api/signupService";
import ToastBox from 'react-native-simple-toast';
import { isEmpty } from 'lodash'

const Signup = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSignup = async () => {
    try {
      await signupUser({ name, number, email, password });
      navigation.goBack()
      ToastBox.show('User created successfully', 5);
    } catch (err) {
      ToastBox.show('User already exist', 5);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🎉</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity disabled={(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(number))} style={[(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(number)) ? styles.offBtn : styles.btn]} onPress={() => handleSignup()}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f9ff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth:0.2,
    marginBottom: 17,
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
  },
  offBtn: {
    backgroundColor: "#858585ff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#007AFF",
    fontWeight: "500",
  },
});
