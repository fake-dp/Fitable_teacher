import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const multipartAxios = axios.create({
    baseURL: `${Config.API_URL}`,
  });
  
  // 요청 인터셉터
  multipartAxios.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }
      config.headers['Content-Type'] = 'multipart/form-data';
      return config;
  });
  
 // 응답 인터셉터
 multipartAxios.interceptors.response.use(null, async (error) => {
  console.log('Error status:', error && error.response && error.response.status); // 콘솔 로그 추가
  const originalRequest = error.config;
  if (error && error.response && error.response.status === 401 && error.response.data && error.response.data.code === 10100) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log('지금 스토리지에 있는 토큰값:', refreshToken); // 콘솔 로그 추가
    if (!refreshToken) {
      console.error("Refresh token is not available.");
      return Promise.reject(error);
    }
    console.log("여기서 리프레쉬 토큰을 받아서 재발급합니당", refreshToken);

    try {
      const response = await axios.post(`${Config.API_URL}/api/trainers/v1/token`, { refreshToken });
      console.log("새롭게 받았습니당!!:", response.data);
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      await AsyncStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
          await AsyncStorage.setItem("refreshToken", newRefreshToken);
      }

      originalRequest.headers.Authorization = `${accessToken}`;
      return multipartAxios(originalRequest);
    } catch (refreshError) {
      // await AsyncStorage.removeItem("accessToken");
      // await AsyncStorage.removeItem("refreshToken");
      console.error('Token refresh failed:!123', refreshError.response.status);
      if (refreshError.response.status === 401 && refreshError.response.data && refreshError.response.data.code === 10100){
        console.log('로그아웃 처리를 해야 합니다.')
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        await AsyncStorage.removeItem("isLogin");
        // Alert.alert('세션이 완료되었습니다. 로그인을 해주세요.');
        return Promise.reject(refreshError);
      }
      return Promise.reject(refreshError); // 원래의 오류 반환
    }
  }
  return Promise.reject(error);
});

export default multipartAxios;
