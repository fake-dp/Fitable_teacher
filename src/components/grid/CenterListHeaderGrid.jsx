import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useRecoilState } from 'recoil';
import { centerListState } from '../../store/atom';
import UseGetCenterListHook from '../../hooks/UseGetCenterListHook';
function CenterListHeaderGrid() {

    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const rightIcon = require('../../assets/caretdown.png');
    console.log('centerList',centerList)
    return (
        <>
        {
           !centerList || centerList?.length === 0 ? (
            <CenterListHeaderContainer>
                <CenterListText>연동된 센터가 없습니다</CenterListText>
            </CenterListHeaderContainer>
            ):(
             <CenterListHeaderContainerBtn>
                <CenterListText>{centerList[0]?.name}</CenterListText>
                <RigthIcon source={rightIcon}/>
            </CenterListHeaderContainerBtn>
            )
        }
        </>
    );
}

export default CenterListHeaderGrid;

const CenterListHeaderContainer = styled.View``

const CenterListHeaderContainerBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const CenterListText = styled.Text`
font-size: 20px;
color: ${COLORS.sub}; 
font-weight: 600;
line-height: 28px;
`


const RigthIcon = styled.Image`
    margin-left: 8px;
`