import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {getAlarmList} from '../../api/alarmApi';
import AlarmLessonListGrid from '../grid/AlarmLessonListGrid';
import AlarmConsultingListGrid from '../grid/AlarmConsultingListGrid';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';

function AlarmTwoBtn() {
    const [centerId, setCenterId] = useRecoilState(centerIdState || 'default_value'); 

    

    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('LESSON');
    const [lessonList, setLessonList] = useState([]);
    const [consultingList, setConsultingList] = useState([]);
    
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
      };

    console.log('centerId',centerId)
    const getAlarmDataList = async (id, type) => {
        console.log('id',id)
        try{
            const response = await getAlarmList({id,type});
            if(type === 'LESSON'){
                setLessonList(response.content);
            }else if(type === 'CONSULTING'){
                setConsultingList(response.content);
        }else{
            return;
        }
    } catch(error){
        console.log('알람 list 에러',error)
    }
}

useEffect(() => {
    if(centerId) {
        getAlarmDataList(centerId, 'LESSON');
        getAlarmDataList(centerId, 'CONSULTING');
    }
}, [centerId])

 
    return (
        <>
        <BtnListContainer>
        <BtnListBox onPress={() => handleTabClick('LESSON')} selected={selectedTab === 'LESSON'}>
          <BtnListText selected={selectedTab === 'LESSON'}>수업</BtnListText>
        </BtnListBox>

        <BtnListBox onPress={() => handleTabClick('CONSULTING')} selected={selectedTab === 'CONSULTING'}>
          <BtnListText selected={selectedTab === 'CONSULTING'}>상담</BtnListText>
        </BtnListBox>
      </BtnListContainer>
      {
            selectedTab === 'LESSON' ?
                <AlarmLessonListGrid lessonList={lessonList}/>
            :
                <AlarmConsultingListGrid consultingList={consultingList}/>
        }
      </>
    );
}

export default AlarmTwoBtn;


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