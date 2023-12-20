import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { GridLineOne } from '../../style/gridStyled';
function MemberInfoCard({ userInfo }) {

    const nextIcon = require('../../assets/img/rightIcon.png');

    return (
        <>
        <CardContainer>
            <BtnGridBox>
            <UserName>{userInfo.name}</UserName>
            <UserPhone>{userInfo.phone}</UserPhone>
            </BtnGridBox>
            <BtnNextIcon source={nextIcon} />
        </CardContainer>
            <GridLineOne />
        </>
    );
}

export default MemberInfoCard;

const CardContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const UserName = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
`;

const UserPhone = styled.Text`
      font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`;
const BtnGridBox = styled.View``

const BtnNextIcon = styled.Image`
    width: 20px;
    height: 20px;
`;