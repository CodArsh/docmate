import { Dimensions } from 'react-native';

const BaseSetting = {
  name: 'Docmate',
  displayName: 'Docmate',
  appVersionCode: '1',
  api: 'http://localhost:8080',
  nWidth: Dimensions.get('window').width,
  nHeight: Dimensions.get('window').height,
  sameSize: Dimensions.get('screen').height,
  fWidth: '100%',
  timeOut: 20000,
  emailRegex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)/,
  endpoints: {
   
  },
};

export default BaseSetting;
