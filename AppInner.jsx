import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Error loading the token", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
