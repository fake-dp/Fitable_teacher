import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { startTime, endTime } from '../../data/selectDate';
import FastImage from 'react-native-fast-image';
import {Platform} from 'react-native';
import { Dimensions } from 'react-native';
function ClassTimeSelectCard({children, imgIcon,setStartTime,setEndTime}) {
    // const {startTime,endTime}=state
    // console.log('state',state) 40 32 
    const rightIcon = require('../../assets/img/colsdowngray.png');
    const screenWidth = Dimensions.get('window').width;
    
    const startPickerRef = useRef();
    const endPickerRef = useRef();

    const openStartPicker = () => {
      console.log('zzz1')
        startPickerRef.current?.togglePicker(true);
        // android 클릭 토글 오픈


    };

    const openEndPicker = () => {
      console.log('zzz2')
        endPickerRef.current?.togglePicker(true);
    };


    return (
       
        <Container>
                <LabelText>{children}</LabelText>
        <SelectBoxGrid>
        

      {
        Platform.OS === 'ios' ? (
          <SelectBox onPress={openStartPicker}>
          <SelectInnerBox>
              {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
              }
              <RNPickerSelect
                    ref={startPickerRef}
                    // InputAccessoryView={() => null}
                    doneText='확인'
                    onValueChange={(value) => setStartTime(value)}
                    items={startTime}
                    textInputProps={{ underlineColorAndroid: 'transparent'}}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
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
        ):(
      <AndSelectBox>
          <SelectInnerBox>
              {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
              }
              <RNPickerSelect
                    ref={startPickerRef}
                    // InputAccessoryView={() => null}
                    doneText='확인'
                    onValueChange={(value) => setStartTime(value)}
                    items={startTime}
                    textInputProps={{ underlineColorAndroid: 'transparent'}}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    placeholder={{
                      label: '시작 시간',
                      value: null,
                    }}
                    // Icon={() => {
                    //   return <RigthIcon source={rightIcon}/>;
                    //   }
                    // }
                    style={
                      { 
                    inputAndroid: 
                    {  
                    fontSize: 16,
                    height: 50, 
                    // width:'100%', 
                    color: '#000000',
                    // backgroundColor:'red',
                    // borderColor: COLORS.gray_200, 
                    // borderWidth: 1, 
                    // borderRadius: 12,
                    // padding: 10
                    }, 
                    iconContainer: {
                      top: 14,
                      right: 12,
                    },
                    }}
                    />

          </SelectInnerBox>
          <RigthIcon source={rightIcon}/>
          </AndSelectBox>
        )
      }



                <DividerText>~</DividerText>

      {
        Platform.OS === 'ios' ? (
          <SelectBox onPress={openEndPicker}>
          <SelectInnerBox>
              {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
              }
                      <RNPickerSelect
                    ref={endPickerRef}
                  //   InputAccessoryView={() => null}
                  doneText='확인'
                  textInputProps={{ underlineColorAndroid: 'transparent'}}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    onValueChange={(value) => setEndTime(value)}
                    items={endTime}
                    placeholder={{
                      label: '종료 시간',
                      value: null,
                    }}
                  style={{ inputIOS: { color: 'black' }, 
                   }}/>
          {/* <SelectBoxText>13:00</SelectBoxText> */}
          </SelectInnerBox>
          <RigthIcon source={rightIcon}/>
       </SelectBox>
        ):(
          <AndSelectBox>
          <SelectInnerBox>
          {
                  imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
              }
                      <RNPickerSelect
                    ref={endPickerRef}
                  //   InputAccessoryView={() => null}
                  doneText='확인'
                  textInputProps={{ underlineColorAndroid: 'transparent'}}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    onValueChange={(value) => setEndTime(value)}
                    items={endTime}
                    placeholder={{
                      label: '종료 시간',
                      value: null,
                    }}
                    // Icon={() => {
                    //   return <RigthIcon source={rightIcon}/>;
                    //   }
                    // }
                    style={
                      { 
                    inputAndroid: 
                    {  
                    fontSize: 16,
                    height: 50, 
                    // width:70, 
                    color: '#000000',
                    // borderColor: COLORS.gray_200, 
                    // borderWidth: 1, 
                    // borderRadius: 12,
                    // padding: 10,
                    // backgroundColor:'red'
                    }, 
                    iconContainer: {
                      top: 14,
                      right: 12,
                    },
  
                     }}/>
          </SelectInnerBox>
          <RigthIcon source={rightIcon}/>
          </AndSelectBox>
        )
      }

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
const AndSelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 0 16px;
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

const RigthIcon = styled(FastImage)`
width: 20px;
height: 20px;
`

const LeftIcon = styled(FastImage)`
margin-right:11px;
width: 20px;
height: 20px;
`