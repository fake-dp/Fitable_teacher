import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const multipartAxios = axios.create({
  baseURL: `${Config.API_URL}`,
});

// 요청 인터셉터
multipartAxios.interceptors.request.use(async config => {
  // const token = await AsyncStorage.getItem('accessToken');

  const token = `eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiMDAxIiwibmFtZSI6Iuyepeyepe2drCIsInN1YiI6IjYyZGMzMTkwLTNlOTYtNGJjNy05NzQ2LWFhYjgzM2Y0ZWZiNiIsImV4cCI6MTcwNzY0MjY2OSwiaWF0IjoxNzA0OTY0MjY5fQ.ThRDEZq7xczldt_VMX5Xt0FVhs_vPdp5-NbvN7ISJZUb1ptTmvoNTx2XQvj6l7dGX3whjbOcOG-ynkoUW5FKLg`;

  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
});

// 응답 인터셉터
multipartAxios.interceptors.response.use(null, async error => {
  const originalRequest = error.config;
  if (
    error &&
    error.response &&
    error.response.status === 401 &&
    error.response.data &&
    error.response.data.code === 10100
  ) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    try {
      const response = await axios.post(
        `${Config.API_URL}/api/trainers/v1/token`,
        {refreshToken},
      );
      const {accessToken} = response.data;
      await AsyncStorage.setItem('accessToken', accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return multipartAxios(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      return Promise.reject(error); // 원래의 오류 반환
    }
  }
  return Promise.reject(error);
});

export default multipartAxios;
