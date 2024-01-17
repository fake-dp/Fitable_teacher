import React, { useState,useEffect, useCallback } from 'react';
import {ExpandableCalendar, CalendarProvider, WeekCalendar,Calendar, LocaleConfig} from 'react-native-calendars';
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
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar(props) {
  const {weekView} = props;
  console.log('weekView',weekView)
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


  const renderCustomHeader = () => {
    const rigthIcon = require('../../assets/img/rightIcon.png');
    return (
      <Container>
        <MonthContainer>
        <TitleText>{currentMonth}</TitleText>
        {/* <Icons source={rigthIcon}/> */}
        </MonthContainer>
        {/* <CalenderToggleBtn isActive={isActive} setIsActive={setIsActive}/> */}
      </Container>
    );
  };



  return (
    <>
       <CalendarProvider
          date={todayString}
          // onDayPress={handleDayPress}
          // TodayButton={true}
        theme={themeStyled}
        renderHeader={renderCustomHeader}
    >
      {weekView ? (
        <WeekCalendar  
        firstDay={1} markedDates={availableDates}
        />
      ) : (
        <ExpandableCalendar
        style={{
            ...Platform.select({
              ios: {
                shadowColor: 'transparent',
                zIndex: 99
              },
              android: {
                elevation: 0
              }
            })
        }}
        renderHeader={renderCustomHeader}
        hideArrows
        markedDates={{
          // 예약된 날짜 표시
          ...availableDates,
          ...{[selected]: { selected: true, disableTouchEvent: true,selectedColor: COLORS.sub,selectedTextColor: COLORS.main  }},
          ...{[todayString]: { dotColor: '#FF7A00',marked: true, selected: selected === todayString}},
          // ...todayStyle    
      }}
          onDayPress={handleDayPress}
          theme={themeStyled&&themeStyled}
          onMonthChange={(month) => {
            setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
        }}
          firstDay={1}

        />
      )
      }

<GridWrapper>
          <GridLine/>
          {lessonList?.length === 0 ? null : (
            <DateTitleContainer>
              <DateTitleText>{getFormattedDate(selected)}</DateTitleText>
              {selected === todayString ? (
                <TodayText>오늘</TodayText>
              ) : null}
            </DateTitleContainer>
          )}
        </GridWrapper>
        <LessonListGrid lessonList={lessonList} />

    </CalendarProvider>
    </>
  );
}

export default CustomCalendar;

const Container = styled.View`
    background-color: ${COLORS.white};
    margin-bottom: 6px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 8px;
    padding: 0 5px;
`
const MonthContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const Icons = styled(FastImage)`
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
margin-top: 10px;
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
margin-top: 4px;
`