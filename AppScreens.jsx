import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/color';
import MainTabScreen from './BottomTab';
import EditProfileScreen from './src/screens/myPage/EditProfileScreen';
import AcountScreen from './src/screens/myPage/AccountScreen';
import TermsScreen from './src/screens/myPage/TermsScreen';
import CenterSettingScreen from './src/screens/myPage/CenterSettingScreen';
import ChangePhoneNumberScreen from './src/screens/myPage/ChangePhoneNumberScreen';

const Stack = createNativeStackNavigator();

function AppScreens(props) {
    return (
        <Stack.Navigator
        screenOptions={{
            
          headerTintColor: 'white',
            headerStyle: {
                // backgroundColor: COLORS.sub,
                borderBottomWidth: 0,
                shadowColor: 'transparent',
                shadowOpacity: 0,
                elevation: 0, 
              },
              headerShadowVisible: false,
              shadowColor: 'transparent',
            headerBackVisible: false,
          }}>
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />
       
       
       
       {/* 마이페이지 스크린 설정 */}
        <Stack.Group
          screenOptions={{
            title: '',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen name="Account" component={AcountScreen} />
            <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumberScreen} />


            <Stack.Screen name="CenterSetting" component={CenterSettingScreen}/>
            <Stack.Screen name="MyProfile" component={EditProfileScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
        </Stack.Group>
       
       
        </Stack.Navigator>
    );
}

export default AppScreens;