import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { COLORS } from './src/constants/color';
import ScheduleMainScreen from './src/screens/schedulePage/ScheduleMainScreen';
import MemberMainScreen from './src/screens/memberPage/MemberMainScreen';
import MypageMainScreen from './src/screens/myPage/MypageMainScreen';
import AlarmMainScreen from './src/screens/alarmPage/AlarmMainScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const baseOptions = {
  title: '',
  headerStyle: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, 
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  shadowColor: 'transparent',
  headerBackVisible: false,
}

const bottonIconSize = {
  width: 18.75,
  height: 18.75,
}

// 스케줄
function ScheduleScreens({ navigation }) {
    return (  
      <Stack.Navigator>
        <Stack.Screen name="ScheduleMain" component={ScheduleMainScreen} 
             options={{
                ...baseOptions
              }}
            />
      </Stack.Navigator>
    );
  }
  
  // 맴버관리
  function MemberScreens({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MemberMain" component={MemberMainScreen}
          options={{
            ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }
  
  // 알람페이지
  function AlarmScreens({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AlarmMain" component={AlarmMainScreen}
          options={{
           ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }
  
  // 마이페이지
  function MyMainScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MypageMain" component={MypageMainScreen}
           options={{
            ...baseOptions
          }}
        />
      </Stack.Navigator>
    );
  }

function MainTabScreen(props) {
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle:({ focused }) => ({
            color: focused ? COLORS.sub : COLORS.gray_300,
            fontSize: 12,
            fontWeight: 'bold',
          }),
          tabBarStyle: {
            backgroundColor: COLORS.white,
          },
          tabBarActiveTintColor: COLORS.sub,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen name="Schedule" component={ScheduleScreens} 
          options={{
            title: '내 일정',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/bottomTab/bottom_sc.png')}
                style={{ 
                  ...bottonIconSize,
                  tintColor: focused ? COLORS.sub : COLORS.gray_300 }}
              />
            ),
            
          }}
        /> 
        <Tab.Screen name="Member" component={MemberScreens} 
         options={{
          title: '회원 관리',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./src/assets/bottomTab/bottom_me.png')}
              style={{ 
                ...bottonIconSize,
                tintColor: focused ? COLORS.sub : COLORS.gray_300 ,
               
            }}
            />
          ),
              }}
        />
        <Tab.Screen name="Alarm" component={AlarmScreens} 
                options={{
                  title: '알림',
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={require('./src/assets/bottomTab/bottom_be.png')}
                      style={{ 
                        ...bottonIconSize,
                        tintColor: focused ? COLORS.sub : COLORS.gray_300 }}
                    />
                  ),
                      }}
        />
        <Tab.Screen name="Mypage" component={MyMainScreen} 
            options={{
              title: '마이',
              tabBarIcon: ({ focused }) => (
                <Image
                  source={require('./src/assets/bottomTab/bottom_my.png')}
                  style={{ 
                    ...bottonIconSize,
                    tintColor: focused ? COLORS.sub : COLORS.gray_300 }}
                />
              ),
                  }}
        />
      </Tab.Navigator>
    );
}

export default MainTabScreen;