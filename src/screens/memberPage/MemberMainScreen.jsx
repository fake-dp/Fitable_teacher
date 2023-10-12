import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
function MemberMainScreen(props) {
    return (
        <MainContainer>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
        <Testtext>맴버 메인</Testtext>
    </MainContainer>
    );
}

export default MemberMainScreen;

const Container = styled.View``
    

const Testtext = styled.Text`
    color: ${COLORS.sub};
`