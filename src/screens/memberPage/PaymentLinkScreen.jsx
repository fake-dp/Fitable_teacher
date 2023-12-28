import React from 'react';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { COLORS } from '../../constants/color';
import  styled  from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
function PaymentLinkScreen(props) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>결제링크 전송</GobackGrid>
        </MainContainer>
    );
}

export default PaymentLinkScreen;