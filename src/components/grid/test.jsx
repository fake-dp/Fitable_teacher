import React from 'react';

function test(props) {
    return (
        <AddCenterListContaniner>
        {
             centerProfiles.map((center, index) => (
                 <ListContaniner  key={center.id}>
                 <ProfileCneterTitleText>연동센터{index+1}</ProfileCneterTitleText>
                 <CenterTitleBoxContainer>
                 <CenterTitleText key={center.id}>{center.name}</CenterTitleText>
                 </CenterTitleBoxContainer>

                 <ProfileCneterTitleText>근무 가능 시간</ProfileCneterTitleText>

                 <ProfileSelectDateCard
                 centerId={center.id}
                 // timeSettings={center.timeSettings[0]?.type}
                 />
                 <TimeSelectCard 
                 index={0}
                 setSelectedCenter={setSelectedCenter}
                 // timeSettings={center?.timeSettings[0]}
                 imgIcon={clockIcon} 
                 text='profile'/>
                 {
                     center.timeCardAdded && (
                         <>
                             <ProfileSelectDateCard
                             //  timeSettings={center.timeSettings[1]?.type}
                             />
                             <TimeSelectCard 
                            index={1}
                               setSelectedCenter={setSelectedCenter}
                             // timeSettings={center?.timeSettings[1]}
                             imgIcon={clockIcon}
                             text='profile' />
                         </>
                     )
                 }
                 {
                     center.timeCardAdded === true ? null:
                 <CenterAddGrayBtn onPress={()=>handleAddTimeCard(center.id)}>시간 추가</CenterAddGrayBtn>
                 }
                 </ListContaniner>
             ))
         }
         </AddCenterListContaniner>
    );
}

export default test;







import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
function TimeSelectCard({children, imgIcon, text,timeSettings,setSelectedCenter,index,onTimeChange}) {
    console.log('index',index)
    // const {startTime,endTime}=state
    // console.log('state',state)
    const rightIcon = require('../../assets/img/colsdowngray.png');
 
    const [selectedStartValue, setSelectedStartValue] = useState(timeSettings.startTime);
    const [selectedEndValue, setSelectedEndValue] = useState(timeSettings.endTime);
    
    const startPickerRef = useRef();
    const endPickerRef = useRef();

    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };

    const openEndPicker = () => {
        endPickerRef.current?.togglePicker(true);
    };

 

// 시간 변경 핸들러
const handleTimeChange = (newTime, isStartTime, index) => {
    setSelectedCenter(prevCenters => prevCenters.map(center => {
        // 현재 timeSettings의 centerId와 일치하는 center 찾기
        if (center.id === timeSettings.centerId) {
            // 복사된 timeSettings 배열에서 현재 인덱스에 해당하는 설정 가져오기
            const updatedTimeSettings = [...center.timeSettings];
            const currentSetting = updatedTimeSettings[index];

            // 시작 시간 또는 종료 시간 업데이트
            if (isStartTime) {
                currentSetting.startTime = newTime;
                setSelectedStartValue(newTime);
            } else {
                currentSetting.endTime = newTime;
                setSelectedEndValue(newTime);
            }

            // 업데이트된 timeSettings로 center 객체 업데이트
            return { ...center, timeSettings: updatedTimeSettings };
        }
        return center;
    }));
};




  console.log('timeSettings',timeSettings,selectedStartValue,selectedEndValue)
      
  const handleStartTimeChange = (newStartTime) => {
    setSelectedStartValue(newStartTime);
    onTimeChange(newStartTime, timeSettings.endTime, index);
};

// 종료 시간 변경 핸들러
const handleEndTimeChange = (newEndTime) => {
    setSelectedEndValue(newEndTime);
    onTimeChange(timeSettings.startTime, newEndTime, index);
};



  useEffect(() => {
    if (timeSettings && index !== undefined) {
        setSelectedStartValue(timeSettings[index]?.startTime);
        setSelectedEndValue(timeSettings[index]?.endTime);
    }
}, [timeSettings, index]);

    return (
        <Container>
            {
                text ==='profile' ? null : <LabelText>{children}</LabelText>
            }
        <SelectBoxGrid>
        <SelectBox onPress={openStartPicker}>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                }
                {
                    text ==='profile' ?
                    (
                    <RNPickerSelect
                      ref={startPickerRef}
                      InputAccessoryView={() => null}
                      onValueChange={(newTime) => handleTimeChange(newTime, true, index)}
                      items={startTime}
                      value={selectedStartValue}
                      placeholder={{}}
                      style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>) : null
                }
            {/* <SelectBoxText>11:00</SelectBoxText> */}
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
                <DividerText>~</DividerText>
         <SelectBox onPress={openEndPicker}>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                }
                {
                    text ==='profile' ?
                    (
                    <RNPickerSelect
                      ref={endPickerRef}
                      InputAccessoryView={() => null}
                      onValueChange={(newTime) => handleTimeChange(newTime, false, index)}
                      items={endTime}
                      value={selectedEndValue}
                      placeholder={{}}
                      style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>) : null
                }
            {/* <SelectBoxText>13:00</SelectBoxText> */}
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
         </SelectBoxGrid>
    </Container>
    );
}

export default TimeSelectCard;



         


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 100%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
    width: 45%;
`
const DividerText = styled.Text`
font-size: 20px;
color: ${COLORS.gray_200};
font-family: Pretendard;
font-weight: 600;
line-height: 28px;
/* margin: 0 8px; */
`


const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`

const SelectBoxText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled.Image``

const LeftIcon = styled.Image`
margin-right:11px
`