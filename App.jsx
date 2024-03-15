import React, { useEffect } from 'react';
import AppInner from './AppInner';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import { fcmTokenState } from './src/store/atom';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}


const configureNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: "fitable-trainer",
      channelName: "fitable client channel",
      channelDescription: "A default channel for all the notifications",
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`CreateChannel returned '${created}'`)
  );
};

const configureNotifications = () => {
  PushNotification.configure({
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

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

function App() {
  const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);

  useEffect(() => {
    requestUserPermission();
    configureNotificationChannel();
    configureNotifications();

    const unsubscribeToken = messaging().onTokenRefresh(token => {
      console.log("FCM Token Refresh >>> ", token);
      setFcmToken(token);
    });

    messaging().getToken().then(token => {
      console.log("FCM Token >>> ", token);
      setFcmToken(token);
    });

    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      PushNotification.localNotification({
        smallIcon: "ic_fitable_foreground",
        channelId: "fitable-trainer",
        title: title,
        message: body,
        playSound: true,
        soundName: 'default',
      });
    });

    return () => {
      unsubscribeToken();
      unsubscribeMessage();
    };
  }, []);

  console.log('fcmToken', fcmToken);

  return <AppInner />;
}

const Main = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default Main;