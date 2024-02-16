import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View,Alert } from 'react-native';
import {autoLoginApi} from './src/api/authApi';
function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('refreshToken');

      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return; // 여기서 함수 종료. 로그인 화면으로 자동 이동.
      }

      try {
          // console.log('refreshTokens넘어감',token) 
          const response =  await autoLoginApi(token);
          if(response){
          const { accessToken, refreshToken } = response;
          await AsyncStorage.setItem('accessToken',accessToken);
          await AsyncStorage.setItem('refreshToken',refreshToken);
          setIsLoggedIn(true);
          }
        } catch (error) {
            setIsLoggedIn(false);
            Alert.alert("로그인 실패", "세션이 만료되었습니다. 다시 로그인 해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    checkLoginStatus();
}, []);



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <Auth /> */}
      {isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
