import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState } from 'react';
import { ScrollView } from 'react-native';
function MemberBtnContents(props) {

    const [selectedTab, setSelectedTab] = useState('개인레슨');
    
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
      };

    return (
        <BtnListContainer>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BtnListBox selected={selectedTab === '개인레슨'} onPress={()=>handleTabClick('개인레슨')}>
          <BtnListText selected={selectedTab === '개인레슨'}>개인레슨</BtnListText>
        </BtnListBox>
        <BtnListBox selected={selectedTab === '그룹레슨'} onPress={()=>handleTabClick('그룹레슨')}>
          <BtnListText selected={selectedTab === '그룹레슨'}>그룹레슨</BtnListText>
        </BtnListBox>
        <BtnListBox selected={selectedTab === '입장중'} onPress={()=>handleTabClick('입장중')}>
          <BtnListText selected={selectedTab === '입장중'}>입장중</BtnListText>
        </BtnListBox>
        <BtnListBox selected={selectedTab === '관리담당'} onPress={()=>handleTabClick('관리담당')}>
          <BtnListText selected={selectedTab === '관리담당'}>관리담당</BtnListText>
        </BtnListBox>
        <BtnListBox selected={selectedTab === '비회원'} onPress={()=>handleTabClick('비회원')}>
          <BtnListText selected={selectedTab === '비회원'}>비회원</BtnListText>
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