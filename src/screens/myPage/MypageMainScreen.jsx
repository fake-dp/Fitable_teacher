import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { useRecoilState } from 'recoil';
import { getMyInfo } from '../../api/mypageApi';
import { myinfoState } from '../../store/atom';
import MyProfileHeaderGrid from '../../components/grid/MyProfileHeaderGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';


function MypageMainScreen(props) {

    const navigation = useNavigation();

    const [myInfo, setMyInfo] = useRecoilState(myinfoState);
    const [shouldFetch, setShouldFetch] = useState(true);
    const getMyInfoData = async () => {
        if (shouldFetch) {
            const response = await getMyInfo();
            setMyInfo(response);
            setShouldFetch(false);
        }
    }

    useEffect(() => {
        getMyInfoData();
    },[myInfo])

    const {name, phone, isOnPushAlarm} = myInfo
    // console.log('호출', name, phone, isOnPushAlarm)


    const goMyAccountScreen = () => {
        navigation.navigate('Account');
    }

    const goMyCenterSettingScreen = () => {
        navigation.navigate('CenterSetting');
    }

    const goMyProfileScreen = () => {
        navigation.navigate('MyProfile');
    }

    const goMyTermsScreen = () => {
        navigation.navigate('Terms');
    }


    return (
        <MainContainer>
            <MyProfileHeaderGrid name={name} phone={phone} onPress={goMyAccountScreen}/>
                
            <GridLine/>

            <MySettingListBtnGrid onPress={goMyCenterSettingScreen}>연동센터 설정</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={goMyProfileScreen}>프로필 관리</MySettingListBtnGrid>

            <GridLine/>

            <MySettingListBtnGrid text='toggle' isOnPushAlarm={isOnPushAlarm}>알림</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={goMyTermsScreen}>이용약관 및 정책</MySettingListBtnGrid>
            <MySettingListBtnGrid text='version'>앱 버전</MySettingListBtnGrid>
        </MainContainer>
    );
}

export default MypageMainScreen;