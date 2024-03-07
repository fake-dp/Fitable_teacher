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
import DatePicker from 'react-native-date-picker';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar(props) {
  const {weekView} = props;
  // console.log('weekView',weekView)
  const isFocused = useIsFocused();
    const [centerId, setCenterId] = useRecoilState(centerIdState || '');

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const [selected, setSelected] = useState(todayString);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [availableDates, setAvailableDates] = useState({});
  const [lessonList, setLessonList] = useState([]);

  const [showDatetModal, setShowDateModal] = useState(false);
  console.log('currentMonth',currentMonth,centerId)
  const openPicker = () => {
    setShowDateModal(true);
  };

  const handleConfirm = useCallback(date => {
    console.log('currentMonth',currentMonth)
    const newSelectedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    setSelected(newSelectedDate);
    setShowDateModal(false);

    const newCurrentMonth = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    setCurrentMonth(newCurrentMonth);

    // API 호출을 통해 선택된 날짜의 수업 정보를 불러옵니다.
    getLessonList(centerId, newSelectedDate)
        .then(data => {
            setLessonList(data.content); // 수업 리스트 상태 업데이트
        })
        .catch(error => {
            console.error("Error fetching lesson list for the selected date:", error);
        });
      }, [centerId,setCurrentMonth, setSelected, setShowDateModal]);





  const handleDayPress = useCallback(day => {
    // 사용자가 선택한 날짜가 오늘 날짜이면 selected를 false로 설정하고, 그렇지 않으면 해당 날짜를 selected로 설정합니다.
  //   if (!availableDates[day.dateString]) {
  //     console.log('This date is not available for selection.');
  //     return;
  // }
   console.log('dayday',day)
    if (day.dateString === todayString) {
      setSelected(todayString);
    } else {
      setSelected(day.dateString);
    }
    if(centerId){
      getLessonList(centerId, day.dateString)
      .then(data => {
          setLessonList(data.content);
      })
      .catch(error => {
          console.error("Error fetching lesson list:", error);
      });
    }

    // getLessonList(centerId, day.dateString)
    // .then(data => {
    //     setLessonList(data.content);
    // })
    // .catch(error => {
    //     console.error("Error fetching lesson list:", error);
    // });
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
          console.error("Error fetching lesson list11:", error);
      });
};

console.log('selected',selected)
useEffect(() => {
  if (isFocused) {
    setSelected(selected);
    fetchLessons(selected); // 오늘 날짜의 수업 목록을 불러옵니다.
}
}, [centerId,isFocused]);


  const renderCustomHeader = () => {
    const rigthIcon = require('../../assets/img/rightIcon.png');
    return (
      <>
      <Container>
        <MonthContainer onPress={openPicker}>
        <TitleText>{currentMonth}</TitleText>
        <Icons source={rigthIcon}/>
        </MonthContainer>
        {/* <CalenderToggleBtn isActive={isActive} setIsActive={setIsActive}/> */}
      </Container>
      </>
    );
  };



  return (
    <>
       <CalendarProvider
        date={todayString}
        theme={themeStyled}
        // current={selected} 
        // key={currentMonth}
        renderHeader={renderCustomHeader}
    

    >
      {weekView ? (
        <WeekCalendar  
        firstDay={0} markedDates={availableDates}
        />
      ) : (
        <ExpandableCalendar
        // key={currentMonth}
        // current={selected} 
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
          ...availableDates,
          ...{[selected]: { selected: true,selectedColor: COLORS.sub,selectedTextColor: COLORS.main  }},
          ...{[todayString]: selected === todayString ? 
            { selected: true, selectedColor: COLORS.sub, selectedTextColor: COLORS.main, dotColor: '#FF7A00', marked: true } : 
            { dotColor: '#FF7A00', marked: true }
        }, 
      }}
          onDayPress={handleDayPress}
          theme={themeStyled&&themeStyled}
          onMonthChange={(month) => {
            setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
        }}
          firstDay={0}
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
        {
      showDatetModal && (
        <DatePicker
        modal
        open={showDatetModal}
        locale="ko-KR"
        date={today}
        onConfirm={(today) => {
          handleConfirm(today)
      }}
        mode="date"
        onCancel={() => {
         setShowDateModal(false)
     }}
     />
      )
    }
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
    margin-top: 10px;
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