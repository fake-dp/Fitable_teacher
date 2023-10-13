import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer,GridLine} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
function MemberMainScreen(props) {
    return (
    <MainContainer>
        <CenterListHeaderGrid />

        <GridLine />
    </MainContainer>
    );
}

export default MemberMainScreen;

