import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
function ClassTimeSelectCard({children, imgIcon,setStartTime,setEndTime}) {
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
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                }
                <RNPickerSelect
                      ref={startPickerRef}
                      InputAccessoryView={() => null}
                      onValueChange={(value) => setStartTime(value)}
                      items={startTime}
                      placeholder={{
                        label: '시작 시간',
                        value: null,
                      }}
                      style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
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
                        <RNPickerSelect
                      ref={endPickerRef}
                    //   InputAccessoryView={() => null}
                    doneText='확인'
                      onValueChange={(value) => setEndTime(value)}
                      items={endTime}
                      placeholder={{
                        label: '종료 시간',
                        value: null,
                      }}
                    style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
            {/* <SelectBoxText>13:00</SelectBoxText> */}
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
         </SelectBoxGrid>
    </Container>
    );
}

export default ClassTimeSelectCard;



         


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