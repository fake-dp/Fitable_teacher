import React, { useState,useEffect, useCallback } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../constants/color';
import { themeStyled } from '../../constants/calendarTheme';
import styled from 'styled-components/native';
import CalenderToggleBtn from '../toggle/CalenderToggleBtn';
import {getLessonCalendar,getLessonList} from '../../api/lessonApi';
import { useRecoilState } from 'recoil';
import {centerIdState} from '../../store/atom';
import LessonListGrid from '../grid/LessonListGrid';
import { GridLine } from '../../style/gridStyled';
import {getFormattedDate} from '../../utils/CustomUtils';
import { useIsFocused } from '@react-navigation/native';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar() {
  const isFocused = useIsFocused();
    const [centerId, setCenterId] = useRecoilState(centerIdState || 'default_value');

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const [selected, setSelected] = useState(todayString);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [availableDates, setAvailableDates] = useState({});
  const [lessonList, setLessonList] = useState([]);

  const handleDayPress = useCallback(day => {
    // 사용자가 선택한 날짜가 오늘 날짜이면 selected를 false로 설정하고, 그렇지 않으면 해당 날짜를 selected로 설정합니다.
    if (!availableDates[day.dateString]) {
      console.log('This date is not available for selection.');
      return;
  }
   
    if (day.dateString === todayString) {
      setSelected(todayString);
    } else {
      setSelected(day.dateString);
    }
    getLessonList(centerId, day.dateString)
    .then(data => {
        setLessonList(data.content);  // 응답 데이터를 lessonList state에 저장
    })
    .catch(error => {
        console.error("Error fetching lesson list:", error);
    });
  }, [todayString, centerId,availableDates]);



  useEffect(() => {
    // 현재 날짜 정보를 가져와서 초기 월과 년도 설정
    const currentDate = new Date();
    setCurrentMonth(`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
  }, [isFocused]);

  useEffect(() => {
    if(centerId){
      fetchAvailableDates();
    }
}, [centerId, currentMonth ,isFocused]);

  function fetchAvailableDates() {
    if (!centerId || !currentMonth) return;
    const [year, month] = currentMonth.split('.');
    getLessonCalendar({ id: centerId, year, month })
        .then(data => {
            const updatedAvailableDates = data.dates.reduce((acc, currDate) => {
                acc[currDate] = { 
                    selected: true,
                    selectedColor: COLORS.gray_100,
                    selectedTextColor: '#000000' 
                };
                return acc;
            }, {});
            setAvailableDates(updatedAvailableDates);
        })
        .catch(error => {
            console.error("Error fetching available dates:", error);
        });
}

const fetchLessons = (date = todayString) => {
  if (!centerId) return;
  getLessonList(centerId, date)
      .then(data => {
          setLessonList(data.content);
      })
      .catch(error => {
          console.error("Error fetching lesson list:", error);
      });
};


useEffect(() => {
  if (isFocused) {
    setSelected(selected);
    fetchLessons(selected); // 오늘 날짜의 수업 목록을 불러옵니다.
}
}, [centerId,isFocused]);



  const isTodayAvailable = availableDates[todayString];

  const todayStyle = isTodayAvailable
    ? {
        [todayString]: {
          ...availableDates[todayString],  // 오늘 날짜의 기존 스타일을 가져옴
          dotColor: '#FF7A00',
          marked: true,
          selected: selected === todayString,
        }
      }
    : { [todayString]: { dotColor: '#FF7A00', marked: true, selected: selected === todayString } };

    
  const renderCustomHeader = () => {
    const rigthIcon = require('../../assets/rightIcon.png');
    return (
      <Container>
        <MonthContainer>
        <TitleText>{currentMonth}</TitleText>
        <Icons source={rigthIcon}/>
        </MonthContainer>
        <CalenderToggleBtn isActive={isActive} setIsActive={setIsActive}/>
      </Container>
    );
  };

  return (
    <>
    <Calendar
    // style={{ height: 320 }}
    onMonthChange={(month) => {
        setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
    }}
    onDayPress={handleDayPress}
    markedDates={{
    // 예약된 날짜 표시
    ...availableDates,
    ...{[selected]: { selected: true, disableTouchEvent: true,selectedColor: COLORS.sub, }},
    ...{[todayString]: { dotColor: '#FF7A00',marked: true, selected: selected === todayString}},
    // ...todayStyle    
}}
    theme={themeStyled}
    renderHeader={renderCustomHeader} // 커스텀 헤더 적용
    enableSwipeMonths={true} // 좌우 스크롤로 월 넘기기
    hideArrows={true} // 화살표 숨기기
    // renderDay={({date, state, marking}) => renderDay({date, state, marking})} // 커스텀 날짜 적용
    // dayComponent={({date, state, marking}) => renderDay({date, state, marking})} // 커스텀 날짜 적용
    />
  

    <GridWrapper>
    <GridLine/>
        {
            lessonList.length === 0 ? null: (
                <DateTitleContainer>
                <DateTitleText>{getFormattedDate(selected)}</DateTitleText>
                {
                    selected === todayString ? <TodayText>오늘</TodayText> : null
                }
                </DateTitleContainer>
            )
        }
    </GridWrapper>
    <LessonListGrid lessonList={lessonList}/>
   
    </>
  );
}

export default CustomCalendar;


const Container = styled.View`
    background-color: ${COLORS.white};
    margin-bottom: 25px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    padding: 0 5px;
`
const MonthContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const Icons = styled.Image`
    width: 20px;
    height: 20px;
    margin-left: 7px;
`


const TitleText = styled.Text`
    color: ${COLORS.sub};
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`

const DateTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom:20px;  
`

const DateTitleText = styled.Text`
color: ${COLORS.sub};
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`
const GridWrapper = styled.View`
    padding: 0 20px;
`

const TodayText = styled.Text`
color: #FF7A00;
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
margin-left: 8px;
`