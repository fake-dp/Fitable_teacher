import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import {formatDate} from '../../utils/CustomUtils'
import RNPickerSelect from 'react-native-picker-select';
import { useState ,useRef, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
function CreateClassSelectCard({children, imgIcon, state ,setState,type,updateClassData,maindata}) {
    // const {startDate=""}=state ||{};
    console.log('Render CreateClassSelectCard:', type, maindata);
    const rightIcon = require('../../assets/img/colsdowngray.png');
    // console.log('state@',type,maindata)

    const transformedState = (state || []).map(item => ({
        label: item.name,
        value: item.id,
    }));


    const pickerRef = useRef();

    const openStartPicker = () => {
        pickerRef.current?.togglePicker(true);
    };

    

    return (
        <Container>
            <LabelText>{children}</LabelText>
            <SelectBox onPress={openStartPicker}>
                <SelectInnerBox>
                    {
                        imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                    }
                    {(
                         <RNPickerSelect
                         ref={pickerRef}
                        //  InputAccessoryView={() => null}
                        doneText='확인'
                         onValueChange={(value) => {
                            const selectedLabel = transformedState.find(item => item.value === value)?.label;
                            if(type === 'item'){
                                setState(value);
                                updateClassData();
                                return;
                            }else{
                                setState(selectedLabel);
                                updateClassData();
                            }
                          }}
                         items={transformedState}
            
                         placeholder={{
                                label: type ==='name' ? '수업명을 선택해주세요' :
                                       type ==='item' ? '수업 종목을 선택해주세요' :
                                       type ==='location' ? '수업장소를 선택해주세요' :'',
                                value: null,
                         }}
                         style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>)
                    }
                </SelectInnerBox>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
        </Container>
    );
}

export default CreateClassSelectCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
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

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:11px;
width: 20px;
height: 20px;
`