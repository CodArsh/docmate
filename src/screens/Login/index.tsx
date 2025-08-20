import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { isEmpty } from 'lodash'
import { loginUser } from "../../api/loginService";
import ToastBox from 'react-native-simple-toast';
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/slices/tokenSlice";
import { setUserData } from "../../redux/slices/userSlice";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });

      dispatch(setAccessToken(response?.token))
      dispatch(setUserData(response?.data))
      navigation.reset({
        routes: [{ name: 'Main' }],
      });
      ToastBox.show(response.message, 5);
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401 || status === 404) {
        ToastBox.show(message, 5);
        throw new Error(message);
      }
      throw new Error(message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <Text style={styles.title}>Welcome Back 👋</Text>

      <View>
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

        <TouchableOpacity disabled={(isEmpty(email) || isEmpty(password))} style={[(isEmpty(email) || isEmpty(password)) ? styles.offBtn : styles.btn]} onPress={() => handleLogin()}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.2,
    marginBottom: 17,
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
