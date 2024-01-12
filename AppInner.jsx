import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';
import {useRecoilState} from 'recoil';
import {isLoginState} from './src/store/atom';
function AppInner() {
  // console.log('AppInner',isLoggedIn,myPhone);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

  return (
    <NavigationContainer>
      {/* {isLoggedIn ? (
        <AppScreens />
      ) : (
        <Auth />
      )} */}

      <AppScreens />
    </NavigationContainer>
  );
}

export default AppInner;
