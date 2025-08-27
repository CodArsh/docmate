import RNFS from 'react-native-fs';
import { Platform, PermissionsAndroid } from 'react-native';
import BaseSetting from '../config/settings';

const BASE_URL = 'http://192.168.1.7:8080';

export type DownloadProgressCallback = (progress: number) => void;

export const downloadFile = async (
  id: string,
  filename: string,
  onProgress: DownloadProgressCallback
) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Storage permission denied');
      }
    }

    const safeFileName = filename.replace(/[^a-z0-9.\-_]/gi, '_');
    const downloadUrl = `${BASE_URL}${BaseSetting.endpoints.downloadFile}/${id}`;
    const downloadDest =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${safeFileName}`
        : `${RNFS.DocumentDirectoryPath}/${safeFileName}`;

    await RNFS.mkdir(downloadDest.substring(0, downloadDest.lastIndexOf('/')));

    const ret = RNFS.downloadFile({
      fromUrl: downloadUrl,
      toFile: downloadDest,
      background: true,
      discretionary: true,
      progressDivider: 1,
      progress: (res) => {
        const percentage = Math.round(
          (res.bytesWritten / res.contentLength) * 100
        );
        onProgress(percentage);
      },
    });
    const response = await ret.promise;

    if (response.statusCode === 200) {
      return { success: true, path: downloadDest };
    } else {
      return { success: false, error: `Failed: ${response.statusCode}` };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
