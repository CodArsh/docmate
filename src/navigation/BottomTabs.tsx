import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Upload from '../screens/Upload';
import History from '../screens/History';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#fff',
          position: 'absolute',
          elevation: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'Dashboard';

          if (route.name === 'Dashboard') iconName = 'dashboard';
          else if (route.name === 'Upload') iconName = 'file-upload';
          else if (route.name === 'History') iconName = 'history';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: Platform.OS === 'ios' ? 5 : 10,
        },
      })}
    >
      {/* Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="dashboard" size={28} color={color} />
          ),
        }}
      />

      {/* Upload - BIG CIRCLE BUTTON */}
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarButton: (props:any) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.8}
              style={styles.uploadButton}
              onPress={props.onPress} // ✅ use default navigation
            >
              <Icon name="cloud-upload" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* History */}
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="history" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf:'center',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25, // lift it above the tab bar
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 8,
    marginTop:-25
  },
});
