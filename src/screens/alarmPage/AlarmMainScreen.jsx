import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
function AlarmMainScreen(props) {
    return (
        <MainContainer>
        <Testtext>알람페이지</Testtext>
      
        <Testtext>알람페이지</Testtext>

        <Testtext>알람페이지</Testtext>
        <Testtext>알람페이지</Testtext>
        <Testtext>알람페이지</Testtext>
        <Testtext>알람페이지</Testtext>
        <Testtext>알람페이지</Testtext>
    </MainContainer>
    );
}

export default AlarmMainScreen;

const Container = styled.View``
    

const Testtext = styled.Text`
    color: ${COLORS.sub};
`