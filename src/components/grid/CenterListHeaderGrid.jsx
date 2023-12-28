import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useRecoilState } from 'recoil';
import { centerListState,centerIdState } from '../../store/atom';
import UseGetCenterListHook from '../../hooks/UseGetCenterListHook';
import RNPickerSelect from 'react-native-picker-select';
import {useRef,useEffect} from 'react';
function CenterListHeaderGrid() {

    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const rightIcon = require('../../assets/img/caretdown.png');
    console.log('centerId@',centerId)

    const startPickerRef = useRef();


    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };


    const transformedState = (centerList || []).map(item => ({
        label: item.name,
        value: item.id,
    }));

    useEffect(() => {
        startPickerRef.current?.forceUpdate();
      }, [centerId]);
      

    return (
        <>
        {
           !centerList || centerList?.length === 0 ? (
            <CenterListHeaderContainer>
                <CenterListText>연동된 센터가 없습니다</CenterListText>
            </CenterListHeaderContainer>
            ):(
             <CenterListHeaderContainerBtn onPress={openStartPicker}>
                {/* <CenterListText>{centerList[0]?.name}</CenterListText>
                <RigthIcon source={rightIcon}/> */}
               
                <RNPickerSelect
                      ref={startPickerRef}
                      value={centerId}
                    //   InputAccessoryView={() => null}
                      onValueChange={(id) => setCenterId(id)}
                      doneText="변경"
                      items={transformedState}
                    //   value={}
                      placeholder={{}}
                      style={{ inputIOS: { color: COLORS.sub, fontSize:20, fontWeight:'bold', lineHeight:24 }, 
                            inputAndroid: { color: COLORS.sub, fontSize:20, fontWeight:'bold', lineHeight:24 } }}/>
              <RigthIcon source={rightIcon}/>
            </CenterListHeaderContainerBtn>
            )
        }
        </>
    );
}

export default CenterListHeaderGrid;

const CenterListHeaderContainer = styled.View``

const CenterListHeaderContainerBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const CenterListText = styled.Text`
font-size: 20px;
color: ${COLORS.sub}; 
font-weight: 600;
line-height: 28px;
`


const RigthIcon = styled.Image`
    margin-left: 8px;
`