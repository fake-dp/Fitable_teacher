import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer,GridLine} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import MemberBtnContents from '../../components/button/MemberBtnContents';
import MemberSearch from '../../components/input/MemberSearch';
import NoListCard from '../../components/card/NoListCard';
import MemberInfoListCard from '../../components/grid/MemberInfoListCard';

function MemberMainScreen(props) {

    const detailSearchIcon = require('../../assets/img/detailsearch.png')


    const userList = [{
        id:0,
        name:'김지수',
        phone:'010-1234-1234',
    },
    {
        id:1,
        name:'오지수',
        phone:'010-1234-1234',
    },
    {
        id:2,
        name:'윤지수',
        phone:'010-1234-1234',
    },{
        id:3,
        name:'심지수',
        phone:'010-1234-1234',
    },{
        id:4,
        name:'김지수',
        phone:'010-1234-1234',
    },
    {
        id:5,
        name:'오지수',
        phone:'010-1234-1234',
    },
    {
        id:6,
        name:'윤지수',
        phone:'010-1234-1234',
    }
    ]

    return (
    <MainContainer>
        <CenterListHeaderGrid />
        <MemberBtnContents />
        <MemberSearch />

        <DetailSearchContainer>
            <DetailSearchText>상세조건을 선택해주세요</DetailSearchText>
            <DetailSearchBtn>
                <DetailIcon source={detailSearchIcon} />
                <DetailSearchBtnText>상세조건</DetailSearchBtnText>
            </DetailSearchBtn>
        </DetailSearchContainer>

        <GridLine />

            {
                userList && userList?.length > 0 ? (
                <MemberInfoListCard userList={userList}/>
                ):(
                <NoListCard>회원이 없습니다</NoListCard>
                )
            }
    </MainContainer>
    );
}

export default MemberMainScreen;

const DetailSearchContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
    
const DetailSearchText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
`
    
const DetailSearchBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const DetailIcon = styled.Image`
    margin-right: 8px;
`
const DetailSearchBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 500;
line-height: 22.40px;
`
