import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import { useState } from 'react';
import { Linking } from 'react-native';
import GobackGrid from '../../components/grid/GobackGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';
import AgreementModal from '../../components/modal/AgreementModal';

function TermsScreen(props) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

    const handleLinkPress = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        });
      };

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
      };

      const closeModal = () => {
        setModalVisible(false);
      };

    return (
        <>
        <MainContainer>
            <GobackGrid onPress={goBack}>이용약관 및 정책</GobackGrid>
            <MySettingListBtnGrid onPress={()=>handleLinkPress('https://fitable.notion.site/Terms-of-use-151276937bf842ad9eabc522978f9148')}>이용약관 동의</MySettingListBtnGrid>
            <MySettingListBtnGrid onPress={()=>handleLinkPress('https://fitable.notion.site/Privacy-Policy-fcfd2a7bbea3444fa49730fb12879755')}>개인정보수집 및 이용에 대한 안내</MySettingListBtnGrid>
        </MainContainer>
        {/* {
            <AgreementModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            />
        } */}
        </>
    );
}

export default TermsScreen;