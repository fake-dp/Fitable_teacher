import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import {autoLoginApi} from './src/api/authApi';
function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const checkLoginStatus = async () => {
    console.log('5분마다 감지')
    try {
      const isLoginAsync = await AsyncStorage.getItem('isLogin');
      const result = await autoLoginApi();
      setIsLoggedIn(result && isLoginAsync === 'true'); 

    } catch (error) {
      console.error('Auto login error11:', error);
      // 오류 처리 로직, 예를 들어 사용자에게 알림 표시
    } finally {
      setIsLoading(false);
    }
  };

  checkLoginStatus();
  const interval = setInterval(checkLoginStatus, 5 * 60 * 1000); // 5분마다 감지
  console.log('interval',interval)
  return () => clearInterval(interval); // 언마운트될 때 interval 정리
}, [setIsLoggedIn]);


console.log('isLoggedInisLoggedIn',isLoggedIn)
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
      { isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
