import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, Alert } from 'react-native';
import CheckBtnGrid from '../../components/grid/CheckBtnGrid';
import { useState, useEffect } from 'react';
import BasicMainBtn from '../../components/button/BasicMainBtn';
import CreateClassSelectCard from '../../components/card/CreateClassSelectCard';
import TimeSelectCard from '../../components/card/TimeSelectCard';
import DateSelectCard from '../../components/card/DateSelectCard';
import DaySelectBtnGrid from '../../components/grid/DaySelectBtnGrid';
import SelectClassDateCard from '../../components/card/SelectClassDateCard';
import {centerIdState,floatingState} from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getClassNames, getClassItem, getClassPlaces ,registerClass, getAssignableMembers} from '../../api/classApi';
import ClassTimeSelectCard from '../../components/card/ClassTimeSelectCard';
import RegisteredModal from '../../components/modal/RegisteredModal';
import {formatDate} from '../../utils/CustomUtils';
import ClassDateCheckBtn from '../../components/button/ClassDateCheckBtn';
function CreateClassScreen(props) {

    const route = useRoute();
    const { type } = route.params;
    const {selectedMember} = route.params;
    const [member, setMember] = useState(selectedMember);
    // console.log('selectedMember',selectedMember,member?.memberTicketId)
    const navigation = useNavigation();

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [registeredModal, setRegisteredModal] = useState(false);
    const [selectedCheckBox, setSelectedCheckBox] = useState("SINGLE");
    const [name, setName] = useState([]);
    const [item, setItem] = useState([]);
    const [location, setLocation] = useState([]);
    console.log('typetypetype',type)
  
    // 상태관리 값 
const [classData, setClassData] = useState({
    centerId: centerId,
    type: type,
    isLesson: true,
    name: "",
    item: "",
    location: "",
    schedulerType: "",
    startDate: "",
    schedules: [
      {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
      },
    ],
  });
  
  const [isActive, setIsActive] = useState(false);

const [className, setClassName] = useState("");
const [classItem, setClassItem] = useState("");
const [classLocation, setClassLocation] = useState("");
//start
const [date, setDate] = useState(new Date())
const [edate, setEdate] = useState(new Date())

const [schedulerType, setSchedulerType] = useState(selectedCheckBox);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [dayOfWeek, setDayOfWeek] = useState("");
const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [isLesson, setIsLesson] = useState(false);

// schedules
const [schedules, setSchedules] = useState([
    {
        dayOfWeek: "",
        startTime: "",
        endTime: "",
    },
]);


// 버튼 활성화 상태 개인
const [personalSingleBtnActive, setPersonalSingleBtnActive] = useState(false)
const [personalMultipleBtnActive, setPersonalMultipleBtnActive] = useState(false)
// 버튼 그룹 활성화 상태
const [groupSingleBtnActive, setGroupSingleBtnActive] = useState(false)
const [groupMultipleBtnActive, setGroupMultipleBtnActive] = useState(false)

    //api
    console.log('schedulesschedulesschedules',schedules)

    const getClassNamesApi = async (centerId) => {
        try{
            const response = await getClassNames(centerId);
            if(response){
                setName(response)
            }
        }catch(error){
            console.log('getClassNamesApi',error.response)
        }
    }

    const getClassItemApi = async (centerId) => {
        try{
            const response = await getClassItem(centerId);
            if(response){
                setItem(response)
            }
        }catch(error){
            console.log('getClassNamesApi',error.response)
        }
    }

    const getClassPlacesApi = async (centerId) => {
        try{
            const response = await getClassPlaces(centerId);
            if(response){
                setLocation(response)
            }
        }catch(error){
            console.log('getClassNamesApi',error.response)
        }
    }

    useEffect(() => {
        if(centerId){
            getClassNamesApi(centerId);
            getClassItemApi(centerId);
            getClassPlacesApi(centerId);
        }
    }, []);

    // 수업 관련 데이터 상태 관리

    const resetClassData = () => {
        setClassName("");
        setClassItem("");
        setClassLocation("");
        setDate(new Date());
        setStartDate("");
        setEndDate("");
        setDayOfWeek("");
        setStartTime("");
        setEndTime("");
        updateClassData();
    }


    const updateClassData = () => {
        setClassData(prevData => ({
            ...prevData,
            name: className || "",
            item: classItem !== null ? classItem : "",
            location: classLocation || "",
            schedulerType: selectedCheckBox,
            startDate: selectDate || "",
            schedules: [
                {
                    startTime: startTime || "",
                    endTime: endTime || "",
                },
            ],
        }));
    };

        // 1:1 수업 일정 일회성 데이터
        const postPersonalSingleData = {
            centerId: centerId,
            type: type,
            isLesson: isLesson,
            name: className,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            schedules: [
                {
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
            assignedMemberTicketId: member?.memberTicketId,
        }

        // 1:1수업 반복 데이터
        const postPersonalMultipleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            endDate: `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`,
            schedules: schedules
        }


        // 그룹 수업 일회성 데이터
        const postGroupSingleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            item: classItem,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            schedules: [
                {
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
        }
     
        // 그룹수업 반복 데이터
        const postGroupMultipleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            item: classItem,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            endDate: `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`,
            schedules: schedules
        }

        const personalData = selectedCheckBox === 'SINGLE' ? postPersonalSingleData : postPersonalMultipleData;
        const postData = selectedCheckBox === 'SINGLE' ? postGroupSingleData : postGroupMultipleData;
        

        console.log('postData@#!@#!@#!@#!@#@!#!@#!@#!@#!@#!@#!@#!@#@!',postData,personalData)
    const selectDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // 개인 수업 등록SINGLE
    const singleRegisterBtn = async(personalData, selectedCheckBox) => {
        // console.log('Class data in test11111:', postPersonalSingleData);
        
        if(selectedCheckBox === 'SINGLE'){
            console.log('tl싱글 개인이요',personalData)
            try {
                const response = await registerClass(personalData);
                if (response) {
                    console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
                    console.log('응답성공해서',personalData)
                    setRegisteredModal(true);
                }
            } catch (error) {
                console.log('err', error);
            }

        }else if(selectedCheckBox === 'MULTIPLE'){
            console.log('tl멀티 개인이요',personalData)
            try {
                const response = await registerClass(personalData);
                if (response) {
                    console.log('멀티 개인이', response.data);
                    console.log('멀티 개인이@~@~@~@~@~',personalData)
                    setRegisteredModal(true);
                }
            } catch (error) {
                console.log('err', error);
            }
        }
    }



 console.log('버튼 콘솔',personalSingleBtnActive,personalMultipleBtnActive,groupSingleBtnActive,groupMultipleBtnActive)
    // 그룹 수업 등록
    const groupRegisterBtn = async(postData,selectedCheckBox) => {
        console.log('postData@#!@#!@#!@#!@#@!#!@#!@#!@#!@#!@#!@#!@#@!',postData)
        updateClassData();
        console.log('Class data in test:', classData);
        if (className === undefined || className === "") {
            Alert.alert('수업명을 입력해주세요');
            return;
        } else if (classData.item === undefined || classData.item === "" || classData.item === null || classItem === undefined || classItem === null || classItem === "null" || classItem === "") {
            Alert.alert('수업 종목을 입력해주세요');
            return;
        } else if (selectDate === undefined || selectDate === "") {
            Alert.alert('수업 날짜를 입력해주세요');
            return;
        } 
        // else if (startTime === undefined || startTime === "" || startTime === "null") {
        //     Alert.alert('수업 시작 시간을 입력해주세요');
        //     return;
        // } else if (endTime === undefined || endTime === ""|| endTime === "null") {
        //     Alert.alert('수업 종료 시간을 입력해주세요');
        //     return;
        // }
        console.log('성공전전에 classData0', classData);

        if(selectedCheckBox === 'SINGLE'){

        try {
            const response = await registerClass(postData);
            if (response) {
                console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
                console.log('응답성공해서',postData)
                setRegisteredModal(true);
            }
        } catch (error) {
            console.log('err', error);
        }
    }else if(selectedCheckBox === 'MULTIPLE'){
    try {
        console.log('aajfxlajf멀티쪽임')
        const response = await registerClass(postData);
        if (response) {
            console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
            console.log('응답성공해서',postData)
            setRegisteredModal(true);
        }
    } catch (error) {
        console.log('err', error.response);
    }
    }
}

    // 그룹 1회성
   const isActiveFn = () => {
        if (
            (className === undefined || className === "") ||
            (classItem === undefined || classItem === "" || classItem === null || classItem === "null" || classItem === "") ||
            (selectDate === undefined || selectDate === "") ||
            (startTime === undefined || startTime === "" || startTime === "null") ||
            (endTime === undefined || endTime === "" || endTime === "null")
        ) {
            return false;
        }
    
        return true;
    };

    const isActiveMultipleFn = () => {
        const isScheduleValid = schedules.every(
            (schedule) =>
              schedule.startTime !== null &&
              schedule.endTime !== null &&
              schedule.startTime !== "" &&
              schedule.endTime !== ""
          );
        if (
          (className === undefined || className === "") ||
          (classItem === undefined || classItem === "" || classItem === null || classItem === "null" || classItem === "") ||
          (selectDate === undefined || selectDate === "") ||
          (edate === undefined || edate === "" || edate === "null") ||
          !isScheduleValid
        ) {
          console.log("Condition not met");
          return false;
        }
      
        console.log("Condition met");
        return true;
      }

    const isPersonalActiveFn = () => {
       if(
        (postPersonalSingleData.name === "" || postPersonalSingleData.name === undefined) || 
        (startTime === undefined || startTime === "" || startTime === "null") ||
        (endTime === undefined || endTime === "" || endTime === "null")
       ){
              return false;
       }
         return true;
    }

    const isPersonalMultipleActiveFn = () => {
        const isScheduleValid = schedules.every(
            (schedule) =>
              schedule.startTime !== null &&
              schedule.endTime !== null &&
              schedule.startTime !== "" &&
              schedule.endTime !== ""
          );
        if(
            (postPersonalSingleData.name === "" || postPersonalSingleData.name === undefined) || 
            (selectDate === undefined || selectDate === "") ||
            (edate === undefined || edate === "" || edate === "null") ||!isScheduleValid
        ){
                return false;
        }
            return true;
    }

    
    const getAssignableMembersScreen = async(id, ableDate, startTime, endTime) => {
        const date = `${ableDate.getFullYear()}-${(ableDate.getMonth() + 1).toString().padStart(2, '0')}-${ableDate.getDate().toString().padStart(2, '0')}`
        console.log('상세아이디 getAssignableMembersScreen',id, date, startTime, endTime)
        if(!date || !startTime || !endTime){
            Alert.alert('날짜와 시간을 선택해주세요');
        }
            try{
                const response = await getAssignableMembers({id, date, startTime, endTime});
                console.log('회원 선택 응답',response)
                navigation.navigate('MemberSelect',{
                    selectData: response.content,
                    routerType:'ableclass',
                })
            }catch(error){
                console.log('error 뜸 ㅠㅠ', error)
            }
    }

    
    //맴버 삭제 버튼
    const handleDeleteBtn = () =>{
        setMember(null)
    }
    useEffect(() => {
        if (selectedMember) {
          setMember(selectedMember);
        }
      }, [selectedMember]);

    
    useEffect(() => {
        // console.log('Class data updated:', classData);
        if(type === 'GROUP'){
            if(selectedCheckBox === 'SINGLE'){
                 setIsActive(isActiveFn());
            }else if(selectedCheckBox === 'MULTIPLE'){
                 setIsActive(isActiveMultipleFn());
            }
        }else if(type === 'PERSONAL'){
            if(selectedCheckBox === 'SINGLE'){
                 setIsActive(isPersonalActiveFn());
            }else if(selectedCheckBox === 'MULTIPLE'){
                 setIsActive(isPersonalMultipleActiveFn());
            }
        }
    }, [className, classItem, classLocation, startDate, startTime, endTime, classData,schedules]);
  


    const goBack = () => {
        navigation.goBack();
    }

    const calendarIcon = require('../../assets/img/calendarIcon.png');
    const classIcon = require('../../assets/img/classIcon.png');
    const clockIcon = require('../../assets/img/clockIcon.png');
    const itemIcon = require('../../assets/img/itemIcon.png');
    const locationIcon = require('../../assets/img/locationIcon.png');
    const addBtnIcon = require('../../assets/img/pluscircle.png')
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
                    <CheckBtnGrid 
                    selectedCheckBox={selectedCheckBox} 
                    resetClassData={resetClassData}
                    setIsActive={setIsActive}
                    setSelectedCheckBox={setSelectedCheckBox}/>
                    {
                    selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && (
                            <ClassDateCheckBtn 
                            classDate={classData}
                            isLesson={isLesson}
                            setIsLesson={setIsLesson}
                            setMember={setMember}
                            />
                        )
                    }
                    {
                        
                type === 'GROUP' ? (
                    <>
                    <CreateClassSelectCard state={name} imgIcon={classIcon} type="name" setState={setClassName} maindata={className} updateClassData={updateClassData} >수업명</CreateClassSelectCard>
                    <CreateClassSelectCard state={item} imgIcon={itemIcon} type="item" setState={setClassItem} updateClassData={updateClassData} maindata={classItem}>종목</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' ? 
                        (<SelectClassDateCard state={name}imgIcon={calendarIcon} type="date"date={date} setDate={setDate}>날짜</SelectClassDateCard>)
                        :( <DateSelectCard 
                            date={date} setDate={setDate}
                            edate={edate} setEdate={setEdate}
                            imgIcon={calendarIcon} state={classData}>날짜</DateSelectCard>)
                    }
                        <CreateClassSelectCard state={location} imgIcon={locationIcon}type="location" setState={setClassLocation} updateClassData={updateClassData} maindata={classLocation}>장소(선택)</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' && <ClassTimeSelectCard setStartTime={setStartTime} setEndTime={setEndTime} setEndTimeimgIcon={clockIcon}>시간</ClassTimeSelectCard>
                    }
                   
                    {
                        selectedCheckBox === 'MULTIPLE' && (<DaySelectBtnGrid
                        title="시간"
                        schedules={schedules}
                        setSchedules={setSchedules}
                        />)
                    }
                    </>):(
                    // 1:1 수업
                    <>
                    <CreateClassSelectCard state={name} imgIcon={classIcon} type="name" setState={setClassName} updateClassData={updateClassData}>수업명</CreateClassSelectCard>
                    {/* <CreateClassSelectCard state={location} imgIcon={locationIcon} type="location" setState={setClassLocation} updateClassData={updateClassData}>장소1</CreateClassSelectCard> */}
                    
                    {
                        selectedCheckBox === 'SINGLE' ? (
                            <>
                        <SelectClassDateCard state={name}imgIcon={calendarIcon} type="date" date={date} setDate={setDate}>날짜</SelectClassDateCard>
                        {/* <ClassTimeSelectCard  setStartTime={setStartTime} setEndTime={setEndTime} imgIcon={clockIcon}>시간</ClassTimeSelectCard> */}

                        </>
                        ):( <DateSelectCard 
                            date={date} setDate={setDate}
                            edate={edate} setEdate={setEdate}
                            imgIcon={calendarIcon} state={classData}
                            >날짜</DateSelectCard>)
                    }

                    <CreateClassSelectCard state={location} imgIcon={locationIcon} type="location" setState={setClassLocation} updateClassData={updateClassData}>장소(선택)</CreateClassSelectCard>
                    {
                        selectedCheckBox === 'SINGLE' &&  <ClassTimeSelectCard  setStartTime={setStartTime} setEndTime={setEndTime} imgIcon={clockIcon}>시간</ClassTimeSelectCard>
                    }
                    {
                    type==="PERSONAL" && selectedCheckBox === 'MULTIPLE' && (<DaySelectBtnGrid
                        title="시간"
                        schedules={schedules}
                        setSchedules={setSchedules}
                        />)
                    }
                    
                    </>
                    
                    )
            }
               {
                   isLesson === false && selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && (
                        member ? (
                            <MembersListContaniner>
                            <MemberName>{member.name}</MemberName>
                            <DeleteContainer onPress={handleDeleteBtn}>
                            <MemberName>⎯</MemberName>
                            </DeleteContainer>
                            </MembersListContaniner>
                        ):(
                            <AssignMemberContainer onPress={()=>getAssignableMembersScreen(centerId, date, startTime, endTime)}>
                            <AddbtnIcon source={addBtnIcon}/>    
                            <LabelText>예약 회원</LabelText>
                            </AssignMemberContainer>
                                )
                        
                        )
                }


            </ScrollView>
        <CreateBtnContainer />
        <BasicMainBtn 
        isActive={isActive}
        // <BasicMainBtn 
        // isActive={
        //     type === 'GROUP' && selectedCheckBox === 'SINGLE'? setIsActive(isActiveFn()) 
        // :   type === 'GROUP' && selectedCheckBox === 'MULTIPLE'? setIsActive(isActiveMultipleFn())
        // :   type === 'PERSONAL' && selectedCheckBox === 'SINGLE'? setIsActive(isPersonalActiveFn())
        // :   setIsActive(isPersonalActiveFn())
        // }
        onPress={type === 'GROUP' ? ()=>groupRegisterBtn(postData, selectedCheckBox) : ()=>singleRegisterBtn(personalData, selectedCheckBox)}>등록하기</BasicMainBtn>
        </MainContainer>
        {
           registeredModal && <RegisteredModal 
              setRegisteredModal={setRegisteredModal}
           />
        }
        </>
    );
}

export default CreateClassScreen;

const CreateBtnContainer = styled.View`
    margin-top: 80px;
`;

const AssignMemberContainer = styled.TouchableOpacity`
display: flex;
flex-direction: row;
align-items: center;
margin-top: 22px;
margin-bottom: 42px;
`;

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
/* margin-bottom: 12px; */
`;

const AddbtnIcon = styled.Image`
    margin-right: 8px;
`;

const MembersListContaniner = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const DeleteContainer = styled.TouchableOpacity`
width: 28px;
`

const MemberName = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

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