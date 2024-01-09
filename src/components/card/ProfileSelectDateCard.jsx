import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
function ProfileSelectDateCard({timeSettingId, timeSettings, changeType ,index}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/colsdowngray.png');
  
    const [selectedValue, setSelectedValue] = useState(timeSettings?.type || '');

    const handleChangeValue = (value) => {
      setSelectedValue(value);
      changeType(timeSettingId, value, index);
  };
    const pickerRef = useRef();
    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };
    const items = [{
        label: '평일',
        value: '평일',
      }, {
        label: '주말',
        value: '주말',
      }];

  
    // console.log('timeSettings',timeSettings)


    return (
        <>
        <Container>
            <SelectBox onPress={openPicker}>
                <SelectInnerBox>
                    <RNPickerSelect
                      ref={pickerRef}
                      // InputAccessoryView={() => null}
                      doneText='확인'
                        onValueChange={(value) => handleChangeValue(value)}
                        items={items}
                        placeholder={{}}
                        style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
                </SelectInnerBox>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
        </Container>
        </>
    );
}

export default ProfileSelectDateCard;


const Container = styled.View`
margin-bottom: 8px;
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

const RigthIcon = styled.Image``

const LeftIcon = styled.Image`
margin-right:11px
`
