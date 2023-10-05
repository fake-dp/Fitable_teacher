import {NavigationContainer} from '@react-navigation/native';
import Auth from './Auth';
import AppScreens from './AppScreens';

function AppInner() {
// console.log('AppInner',isLoggedIn,myPhone);

  return (
    <NavigationContainer>
      {/* {true ? (
        <AppScreens />
      ) : (
        <Auth />
      )} */}
      <Auth />
    </NavigationContainer>
  );
}

export default AppInner;