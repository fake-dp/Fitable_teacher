
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_URL;

export const loginApi = async (phone, password, fcmToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/trainers/v1/login`, { phone, password,fcmToken });
        // console.log('responseresponse',response.data)
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        console.log('로그인 데이터 acce',accessToken)
        console.log('로그인 데이터 ref',refreshToken)
        return response.data;
      } catch (error) {
        console.log("Login failed@@:", error);
        throw error;
      }
};



export const autoLoginApi = async (refreshToken) => {
    try {
        const response = await axios.post(`${baseURL}/api/trainers/v1/token`, {refreshToken});
        // const { accessToken } = response.data;
        // await AsyncStorage.setItem("accessToken", accessToken);
        return response.data; // 갱신 성공 시 true 반환
    } catch (refreshError) {
        console.error('Token refresh failed:@@@@@', refreshError);
        throw refreshError.response; // 오류 수정
    }
}
