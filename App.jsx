import AppInner from './AppInner';
import { RecoilRoot } from 'recoil';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import {fcmTokenState} from './src/store/atom';
import { useRecoilState } from 'recoil';

import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});



function App() {
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    requestUserPermission();

    const unsubscribeToken = messaging().onTokenRefresh(token => {
      // console.log("FCM Token Refresh >>> ", token);
      setFcmToken(token);
    });

    messaging().getToken().then(token => {
      // console.log("FCM Token >>> ", token);
      setFcmToken(token);
    });

    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      Alert.alert(title, body);
    });

    return () => {
      unsubscribeToken();
      unsubscribeMessage();
    };
  }, []);

    useEffect(() => {
      messaging().getToken().then(token => {
        // console.log("FCM Token1 >>> ", token);
        setFcmToken(token);
      });
    }, []);

    useEffect(() => {
      return messaging().onTokenRefresh(token => {
        // console.log("FCM Token Refresh >>> ", token);
        setFcmToken(token);
      });
    }, []);
    
    // console.log('fcmToken',fcmToken)

  return <AppInner />;
}

const Main = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default Main;
