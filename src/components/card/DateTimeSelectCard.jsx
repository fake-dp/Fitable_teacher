import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
import FastImage from 'react-native-fast-image';

function DateTimeSelectCard({children,setStartTime,setEndTime}) {
    // const {startTime,endTime}=state
    // console.log('state',state)
    const rightIcon = require('../../assets/img/colsdowngray.png');

    
    const startPickerRef = useRef();
    const endPickerRef = useRef();

    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };

    const openEndPicker = () => {
        endPickerRef.current?.togglePicker(true);
    };


    return (
        <Container>
                <LabelText>{children}</LabelText>
        <SelectBoxGrid>
        <SelectBox onPress={openStartPicker}>
            <SelectInnerBox>
                <RNPickerSelect
                      ref={startPickerRef}
                      // InputAccessoryView={() => null}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                      doneText='확인'
                      onValueChange={(value) => setStartTime(value)}
                      items={startTime}
                      placeholder={{
                        label: '시작 시간',
                        value: null,
                      }}
                      style={{ inputIOS: { color: 'black' }, 
                      inputAndroid: { 
                        color: 'black',
                        height: 20,
                        padding:0,
                        margin:0,
                        } }}/>
            {/* <SelectBoxText>11:00</SelectBoxText> */}
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
                <DividerText> ~ </DividerText>
         <SelectBox onPress={openEndPicker}>
            <SelectInnerBox>
                        <RNPickerSelect
                      ref={endPickerRef}
                      InputAccessoryView={() => null}
                      onValueChange={(value) => setEndTime(value)}
                      items={endTime}
                      textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                      placeholder={{
                        label: '종료 시간',
                        value: null,
                      }}
                    style={{ inputIOS: { color: 'black' },
                     inputAndroid: { 
                      color: 'black',
                      height: 20,
                      padding:0,
                      margin:0,
                       } }}/>
            {/* <SelectBoxText>13:00</SelectBoxText> */}
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
         </SelectBoxGrid>
    </Container>
    );
}

export default DateTimeSelectCard;


const Container = styled.View`
/* margin-top: 10px; */
/* margin-bottom: 20px; */
/* background-color: ${COLORS.main}; */
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 74%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
    width: 56%;
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


const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:11px;
width:20px;
height: 20px;
`