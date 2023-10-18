import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import CheckBtnGrid from '../../components/grid/CheckBtnGrid';
import { useState } from 'react';
import BasicMainBtn from '../../components/button/BasicMainBtn';
import CreateClassSelectCard from '../../components/card/CreateClassSelectCard';
import TimeSelectCard from '../../components/card/TimeSelectCard';
import DateSelectCard from '../../components/card/DateSelectCard';
import DaySelectBtnGrid from '../../components/grid/DaySelectBtnGrid';

function CreateClassScreen(props) {

    const route = useRoute();
    const { type } = route.params;
    const navigation = useNavigation();


    const [selectedCheckBox, setSelectedCheckBox] = useState("SINGLE");


    const [classData, setClassData] = useState({
        centerId: "aef57d38a-2d7b-4666-a822-3243459e1e62",
        type: type,
        isLesson: true,
        name: "수업명을 선택해주세요",
        item: "수업 종목을 선택해주세요",
        location: "수업 장소를 선택해주세요",
        schedulerType: "SINGLE",
        startDate: "시작 일자",
        endDate: "종료 일자",
        schedules: [
          {
            dayOfWeek: "MONDAY",
            startTime: "시작시간",
            endTime: "종료시간"
          }
        ],
        assignedMemberTicketId: "1217d38a-2d7b-4666-a822-3243459e1e62",
        isRequiredReservation: true,
        isWaiting: true,
        totalMembers: 4,
        totalWaitingMembers: 4
        })


    console.log('type', classData.type, classData.item)


    const goBack = () => {
        navigation.goBack();
    }

    const calendarIcon = require('../../assets/calendarIcon.png');
    const classIcon = require('../../assets/classIcon.png');
    const clockIcon = require('../../assets/clockIcon.png');


    return (
        <>
        <MainContainer>
            <GobackGrid onPress={goBack}/>
                <ScrollView showsVerticalScrollIndicator={false}overScrollMode="never"bounces={false}>
                    {
                        type === 'GROUP' ? (
                            <MainLongTextGrid>그룹 수업을</MainLongTextGrid>
                            ):(
                                <MainLongTextGrid>1:1수업 일정을</MainLongTextGrid>
                                )
                    }
                    <MainLongTextGrid>만들어주세요</MainLongTextGrid>

                    {/* 컨텐츠 바디 */}
                    <CheckBtnGrid selectedCheckBox={selectedCheckBox}setSelectedCheckBox={setSelectedCheckBox}/>

            {
                type === 'GROUP' ? (
                    <>
                    <CreateClassSelectCard state={classData.name} imgIcon={classIcon}>수업명</CreateClassSelectCard>
                    <CreateClassSelectCard state={classData.item}>종목(선택)</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' ? (<CreateClassSelectCard state={classData.startDate}imgIcon={calendarIcon}>날짜</CreateClassSelectCard>)
                        :( <DateSelectCard imgIcon={calendarIcon} state={classData}>날짜</DateSelectCard>)
                    }

                    <CreateClassSelectCard state={classData.location}>장소(선택)</CreateClassSelectCard>
                   
                   <TimeSelectCard imgIcon={clockIcon} state={classData.schedules[0]}>시간</TimeSelectCard>
                    {
                        selectedCheckBox === 'MULTIPLE' && (<DaySelectBtnGrid/>)
                    }
                    </>):(
                    // 1:1 수업
                    <>
                    <CreateClassSelectCard state={classData.name} imgIcon={classIcon}>수업명1</CreateClassSelectCard>
                    <CreateClassSelectCard state={classData.location}>장소1</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' ? (<CreateClassSelectCard state={classData.startDate}imgIcon={calendarIcon}>날짜</CreateClassSelectCard>)
                        :( <DateSelectCard imgIcon={calendarIcon} state={classData}>날짜</DateSelectCard>)
                    }
                    <TimeSelectCard imgIcon={clockIcon} state={classData.schedules[0]}>시간</TimeSelectCard>
                    </>
                    )
            }



            </ScrollView>
        <CreateBtnContainer />
        <BasicMainBtn  onPress={()=>console.log('등록')}>등록하기</BasicMainBtn>
        </MainContainer>
        </>
    );
}

export default CreateClassScreen;

const CreateBtnContainer = styled.View`
    margin-top: 80px;
`

// {
//     "centerId": "aef57d38a-2d7b-4666-a822-3243459e1e62",
//     "type": "PERSONAL",
//     "isLesson": true,
//     "name": "1:1 P.T 집중코칭",
//     "item": "7657d38a-2d7b-4666-a822-3243459e1e62",
//     "location": "PT실",
//     "schedulerType": "SINGLE",
//     "startDate": "2023-08-28T10:00:35+09:00",
//     "endDate": "2023-09-28T10:00:35+09:00",
//     "schedules": [
//       {
//         "dayOfWeek": "MONDAY",
//         "startTime": "08:00:00",
//         "endTime": "09:00:00"
//       }
//     ],
//     "assignedMemberTicketId": "1217d38a-2d7b-4666-a822-3243459e1e62",
//     "isRequiredReservation": true,
//     "isWaiting": true,
//     "totalMembers": 4,
//     "totalWaitingMembers": 4
//   }