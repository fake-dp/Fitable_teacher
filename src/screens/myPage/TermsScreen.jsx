import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import { useState } from 'react';
import GobackGrid from '../../components/grid/GobackGrid';
import MySettingListBtnGrid from '../../components/grid/MySettingListBtnGrid';
import AgreementModal from '../../components/modal/AgreementModal';

function TermsScreen(props) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

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
            <MySettingListBtnGrid onPress={openModal}>이용약관 동의</MySettingListBtnGrid>
            <MySettingListBtnGrid>개인정보수집 및 이용에 대한 안내</MySettingListBtnGrid>
        </MainContainer>
        {
            <AgreementModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            />
        }
        </>
    );
}

export default TermsScreen;