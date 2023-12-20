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
import {centerIdState} from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getClassNames, getClassItem, getClassPlaces ,registerClass} from '../../api/classApi';
import ClassTimeSelectCard from '../../components/card/ClassTimeSelectCard';
import RegisteredModal from '../../components/modal/RegisteredModal';
import {formatDate} from '../../utils/CustomUtils';
import ClassDateCheckBtn from '../../components/button/ClassDateCheckBtn';
function CreateClassScreen(props) {

    const route = useRoute();
    const { type } = route.params;
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

    //api
    // console.log('centerId',centerId)

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


        const postPersonalSingleData = {
            centerId: centerId,
            type: type,
            isLesson: isLesson,
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

        const postPersonalMultipleData = {
            centerId: centerId,
            type: type,
            isLesson: true,
            name: className,
            item: classItem,
            location: classLocation,
            schedulerType: selectedCheckBox,
            startDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            endDate: `${edate.getFullYear()}-${(edate.getMonth() + 1).toString().padStart(2, '0')}-${edate.getDate().toString().padStart(2, '0')}`,
            schedules: [
                {
                    dayOfWeek: dayOfWeek,
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
        }


        // console.log('classDataclassData',classData)
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
            schedules: [
                {
                    dayOfWeek: dayOfWeek,
                    startTime: startTime,
                    endTime: endTime,
                },
            ],
        }

        const personalData = selectedCheckBox === 'SINGLE' ? postPersonalSingleData : postPersonalMultipleData;
        const postData = selectedCheckBox === 'SINGLE' ? postGroupSingleData : postGroupMultipleData;
        

        console.log('postData@#!@#!@#!@#!@#@!#!@#!@#!@#!@#!@#!@#!@#@!',postData)
    const selectDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // 개인 수업 등록SINGLE
    const singleRegisterBtn = async(postPersonalSingleData, selectedCheckBox) => {
        // console.log('Class data in test11111:', postPersonalSingleData);
        if(selectedCheckBox === 'SINGLE'){
            console.log('tl싱글 개인이요',postPersonalSingleData)
            try {
                const response = await registerClass(postPersonalSingleData);
                if (response) {
                    console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
                    console.log('응답성공해서',postPersonalSingleData)
                    setRegisteredModal(true);
                }
            } catch (error) {
                console.log('err', error.response);
            }

        }else if(selectedCheckBox === 'MULTIPLE'){
            console.log('tl멀티 개인이요',postPersonalSingleData)
        }
    }




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
        } else if (startTime === undefined || startTime === "" || startTime === "null") {
            Alert.alert('수업 시작 시간을 입력해주세요');
            return;
        } else if (endTime === undefined || endTime === ""|| endTime === "null") {
            Alert.alert('수업 종료 시간을 입력해주세요');
            return;
        }
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
            console.log('err', error.response);
        }
    }else if(selectedCheckBox === 'MULTIPLE'){
    try {
        console.log('aajfxlajf멀티쪽임')
        // const response = await registerClass(postData);
        // if (response) {
            // console.log('response@#!@#!@#!@#!@#!@#!@#!@', response.data);
            // console.log('응답성공해서',postData)
            setRegisteredModal(true);
        // }
    } catch (error) {
        console.log('err', error.response);
    }
    }
}

    
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
    
      
    
    
    useEffect(() => {
        // console.log('Class data updated:', classData);
        setIsActive(isActiveFn());
        // console.log(12212,classData)
    }, [className, classItem, classLocation, startDate, startTime, endTime, classData]);
        // console.log('dfasdf',className,classItem,classLocation,location)
        console.log('classDatac변화후1',classData.schedules[0].endTime ,endTime)
        console.log('classDatac변화후2',classData.name ,className)
        console.log('classDatac변화후3',classData.item ,classItem)
        console.log('classDatac변화후4',classData.location,classLocation)
    const goBack = () => {
        navigation.goBack();
    }

    const calendarIcon = require('../../assets/img/calendarIcon.png');
    const classIcon = require('../../assets/img/classIcon.png');
    const clockIcon = require('../../assets/img/clockIcon.png');
    const itemIcon = require('../../assets/img/itemIcon.png');
    const locationIcon = require('../../assets/img/locationIcon.png');

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
                    setSelectedCheckBox={setSelectedCheckBox}/>
                    {
                    selectedCheckBox==='SINGLE' &&  type !== 'GROUP' && (
                            <ClassDateCheckBtn 
                            classDate={classData}
                            isLesson={isLesson}
                            setIsLesson={setIsLesson}
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
                    <CreateClassSelectCard state={name} imgIcon={classIcon} type="name" setState={setClassName} updateClassData={updateClassData}>수업명11</CreateClassSelectCard>
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
                            >날짜22</DateSelectCard>)
                    }

                    <CreateClassSelectCard state={location} imgIcon={locationIcon} type="location" setState={setClassLocation} updateClassData={updateClassData}>장소(선택)11</CreateClassSelectCard>
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



            </ScrollView>
        <CreateBtnContainer />
        <BasicMainBtn 
        isActive={isActive}
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