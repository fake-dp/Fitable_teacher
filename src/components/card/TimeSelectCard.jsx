import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
function TimeSelectCard({children, imgIcon, state ,onPress, text}) {

    // const {startTime,endTime}=state
    // console.log('state',state)
    const rightIcon = require('../../assets/colsdowngray.png');
 
    const [selectedStartValue, setSelectedStartValue] = useState('');
    const [selectedEndValue, setSelectedEndValue] = useState('');
    
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
                      onValueChange={(value) => setSelectedStartValue(value)}
                      items={startTime}
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
                      onValueChange={(value) => setSelectedEndValue(value)}
                      items={endTime}
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