import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { tokenVerify } from '../../api/tokenVerify';
import ToastBox from 'react-native-simple-toast';
import type { RootState } from "../../redux";

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const userData = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token?.accessToken)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (userData?.id) {
        try {
          const response = await tokenVerify({ token });
          if (response.status === 200) {
            navigation.reset({
              routes: [{ name: 'Main' }],
            });
          }
        } catch (error: any) {
          ToastBox.show('Session expired, please login again', 10)
          navigation.reset({
            routes: [{ name: 'Login' }],
          });
          console.log(error.message);
        }
      } else {
        navigation.reset({
          routes: [{ name: 'Login' }],
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, userData, token]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyApp</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});
