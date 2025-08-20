import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar, LogBox } from 'react-native';
import LogoutModal from './src/components/LogoutModal/LogoutModal';
import { useDispatch } from 'react-redux';
import { clearUserData } from './src/redux/slices/userSlice';
import { hideLogoutModal } from './src/redux/slices/logoutSlice';
import { navigationRef, resetToSplash } from './src/navigation/RootNavigation';

const Root = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: any) => state.logout.logoutModalVisible);

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(hideLogoutModal());
    resetToSplash();
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={'#007AFF'} barStyle={'light-content'} />
        <AppNavigator />

        <LogoutModal
          visible={visible}
          onClose={() => dispatch(hideLogoutModal())}
          onConfirm={handleLogout}
        />
      </NavigationContainer>
    </>
  );
};

export default function App() {
  if (__DEV__) {
    LogBox.ignoreAllLogs(true); // ignore ALL logs
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
