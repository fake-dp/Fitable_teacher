import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';

import Signature from 'react-native-signature-canvas';

import {Image, View} from 'react-native';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';

function AppInner() {
  // console.log('AppInner',isLoggedIn,myPhone);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

  const [sign, setSign] = useState('');

  useEffect(() => {
    console.log('sing onChange', sign);
  }, [sign]);

  return (
    <NavigationContainer>
      <AppScreens />
    </NavigationContainer>
  );
}

export default AppInner;
