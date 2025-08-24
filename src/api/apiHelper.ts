import BaseSetting from '../config/settings';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../redux';
import { navigate } from '../navigation/RootNavigation';
import { clearUserData } from '../redux/slices/userSlice';
import ToastBox from 'react-native-simple-toast';

// Create an Axios instance (default baseURL will be set dynamically per request)
const api = axios.create({
  timeout: BaseSetting.timeOut,
  headers: {
    'Content-Type': 'application/json',
    'User-Type': 'User',
  },
});

// Add a request interceptor to set the token and dynamically set Content-Type
api.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {

    const state = store.getState();
    // @ts-ignore
    const token = state?.token?.accessToken;
    // console.log(token)

    // Set Authorization token if it exists
    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Dynamically set Content-Type based on the isMultipart flag
    // @ts-ignore
    config.headers['Content-Type'] = config.isMultipart
      ? 'multipart/form-data'
      : 'application/json';

    return config;
  },
  error => Promise.reject(error),
);

// Common handler for response code 403
const handleForbiddenResponse = () => {
  // @ts-ignore
  store.dispatch(clearUserData(''));
  navigate('Signup'); // Navigate to Signup (or Login) screen
  ToastBox.show('Your account is deactivated. Contact to support Team.', 5);
};

// Common function for handling API responses
const handleResponse = <T>(response: AxiosResponse<T>): T => {
  // @ts-ignore
  if (response?.data?.code === 401 || response?.data?.code === 403) {
    handleForbiddenResponse();
  }
  return response.data;
};

// Generic function for API requests with dynamic baseURL
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
  options: { isMultipart?: boolean; onUploadProgress?: (progress: number) => void } = {}
): Promise<T> => {
  try {
    const baseURL = BaseSetting.api;
    const response: AxiosResponse<T> = await api.request({
      method,
      url: baseURL + endpoint,
      data,
      baseURL, // Dynamically set the baseURL
      ...config,
      onUploadProgress: (progressEvent) => {
        if (options.onUploadProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          options.onUploadProgress(percent);
        }
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`${method.toUpperCase()} Request Error:`, error);
    throw error;
  }
};

// Exported API functions
export const getRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
): Promise<T> => apiRequest('get', endpoint, undefined, config);

export const postRequest = <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
  options?: { isMultipart?: boolean; onUploadProgress?: (progress: number) => void }
): Promise<T> => apiRequest('post', endpoint, data, config, options);

export const putRequest = <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
): Promise<T> => apiRequest('put', endpoint, data, config);

export const deleteRequest = <T>(
  endpoint: string,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
): Promise<T> => apiRequest('delete', endpoint, undefined, config);

export const patchRequest = <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig & { remoteConnected?: boolean },
): Promise<T> => apiRequest('patch', endpoint, data, config);

export default api;
