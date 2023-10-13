import React, { useState,useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../constants/color';
import { themeStyled } from '../../constants/calendarTheme';
import styled from 'styled-components/native';
import CalenderToggleBtn from '../toggle/CalenderToggleBtn';
import { View, Text } from 'react-native';
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'ko';

function CustomCalendar() {


  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  

  const [selected, setSelected] = useState(todayString);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleDayPress = day => {
    // 사용자가 선택한 날짜가 오늘 날짜이면 selected를 false로 설정하고, 그렇지 않으면 해당 날짜를 selected로 설정합니다.
    if (day.dateString === todayString) {
      setSelected(todayString);  // 오늘 날짜를 선택하면 선택을 해제합니다.
    } else {
      setSelected(day.dateString);
    }
  };

  useEffect(() => {
    // 현재 날짜 정보를 가져와서 초기 월과 년도 설정
    const currentDate = new Date();
    setCurrentMonth(`${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}`);
  }, []);

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
        // month에 현재 월 정보가 들어있음
        setCurrentMonth(`${month.year}.${String(month.month).padStart(2, '0')}`);
    }}
    onDayPress={handleDayPress}
    markedDates={{
    ...{[selected]: { selected: true, disableTouchEvent: true, selectedDotColor: '#FF7A00',selectedColor: COLORS.sub, }},
    ...{[todayString]: { dotColor: '#FF7A00',marked: true,}}
    }}
    theme={themeStyled}
    renderHeader={renderCustomHeader} // 커스텀 헤더 적용
    enableSwipeMonths={true} // 좌우 스크롤로 월 넘기기
    hideArrows={true} // 화살표 숨기기
    // renderDay={({date, state, marking}) => renderDay({date, state, marking})} // 커스텀 날짜 적용
    // dayComponent={({date, state, marking}) => renderDay({date, state, marking})} // 커스텀 날짜 적용
    />
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