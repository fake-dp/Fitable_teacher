import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import {totalElementsState} from '../../store/atom';
function MemberBtnContents({type, setType,setSearchText}) {

  const [totalElements, setTotalElements] = useRecoilState(totalElementsState);

    // console.log('totalElements123123123',totalElements.ATTENDANCE)
    const handleTabClick = (tab) => {
      setType(tab);
      setSearchText('');
      };

    return (
        <BtnListContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        
        {
             totalElements.PERSONAL > 0 &&
            <BtnListBox selected={type === 'PERSONAL'} onPress={()=>handleTabClick('PERSONAL')}>
             <BtnListText selected={type === 'PERSONAL'}>개인레슨 {totalElements.PERSONAL}</BtnListText>
           </BtnListBox>
        }

        {
          totalElements.GROUP > 0 &&
            <BtnListBox selected={type === 'GROUP'} onPress={()=>handleTabClick('GROUP')}>
            <BtnListText selected={type === 'GROUP'}>그룹레슨 {totalElements.GROUP}</BtnListText>
          </BtnListBox>
        }

        <BtnListBox selected={type === 'ATTENDANCE'} onPress={()=>handleTabClick('ATTENDANCE')}>
          <BtnListText selected={type === 'ATTENDANCE'}>입장중 {totalElements.ATTENDANCE}</BtnListText>
        </BtnListBox>

        <BtnListBox selected={type === 'MANAGING'} onPress={()=>handleTabClick('MANAGING')}>
          <BtnListText selected={type === 'MANAGING'}>관리담당 {totalElements.MANAGING}</BtnListText>
        </BtnListBox>

          <BtnListBox selected={type === 'POTENTIAL'} onPress={()=>handleTabClick('POTENTIAL')}>
          <BtnListText selected={type === 'POTENTIAL'}>비회원 {totalElements.POTENTIAL}</BtnListText>
        </BtnListBox>
    
        
        </ScrollView>
      </BtnListContainer>
    );
}

export default MemberBtnContents;

const BtnListContainer = styled.View`
  flex-direction: row;
  margin-top: 32px;
  margin-bottom: 28px;
`;

const BtnListBox = styled.TouchableOpacity`
  padding: 9px 20px;
  border-radius: 50px;
    margin-right: 10px;
  background-color: ${({ selected }) => (selected ? COLORS.sub : COLORS.white)};
  border: 1px solid ${({ selected }) => (selected ? COLORS.sub : COLORS.gray_300)};
`;

const BtnListText = styled.Text`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  color: ${({ selected }) => (selected ? COLORS.main : COLORS.gray_300)};
`;