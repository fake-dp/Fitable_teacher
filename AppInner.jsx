import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
import {useEffect, useState} from 'react';

function AppInner() {
  // console.log('AppInner',isLoggedIn,myPhone);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

  const [sign, setSign] = useState('');

  useEffect(() => {
    console.log('sing onChange', sign);
  }, [sign]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppScreens /> : <Auth />}
    </NavigationContainer>
  );
}

export default AppInner;
