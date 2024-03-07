import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customAxios = axios.create({
  baseURL: `${Config.API_URL}`,
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
});

// 요청 인터셉터
customAxios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    // console.log('Access token from AsyncStorage:', token); // 콘솔 로그 추가
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  });
  
  // 응답 인터셉터
  customAxios.interceptors.response.use(null, async (error) => {
    console.log('Error status:', error && error.response && error.response.status); // 콘솔 로그 추가
    const originalRequest = error.config;
    if (error && error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log('Refresh token from AsyncStorage:', refreshToken); // 콘솔 로그 추가
      if (!refreshToken) {
        console.error("Refresh token is not available.");
        return Promise.reject(error);
      }
      console.log("Sending refreshToken:", refreshToken);

      try {
        const response = await axios.post(`${Config.API_URL}/api/trainers/v1/token`, { refreshToken });
        console.log("Refresh token response@@:", response.data);
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        await AsyncStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) {
            await AsyncStorage.setItem("refreshToken", newRefreshToken);
        }

        originalRequest.headers.Authorization = `${accessToken}`;
        return customAxios(originalRequest);
      } catch (refreshError) {
        // await AsyncStorage.removeItem("accessToken");
        // await AsyncStorage.removeItem("refreshToken");
        console.error('Token refresh failed:!', refreshError.response.data);
        return Promise.reject(error); // 원래의 오류 반환
      }
    }
    return Promise.reject(error);
});

export default customAxios;
