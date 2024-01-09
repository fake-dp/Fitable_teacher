import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useRecoilState } from 'recoil';
import { centerListState,centerIdState } from '../../store/atom';
import UseGetCenterListHook from '../../hooks/UseGetCenterListHook';
import RNPickerSelect from 'react-native-picker-select';
import {useRef,useEffect,useCallback} from 'react';
import { getCenterList } from '../../api/trainersApi';
function CenterListHeaderGrid() {

    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const rightIcon = require('../../assets/img/caretdown.png');
    console.log('centerId@@@@@11',centerId,centerList)
 

    const startPickerRef = useRef();


    const openStartPicker = () => {
        startPickerRef.current?.togglePicker(true);
    };


    const transformedState = (centerList || []).map(item => ({
        label: item.name,
        value: item.id,
    }));

    const onCenterChange = useCallback((id) => {
        console.log('v뭐로',id)
        if (id !== centerId) { // 변경된 경우에만 업데이트
            setCenterId(id);
            const selectedCenter = centerList.find(center => center.id === id);
            const otherCenters = centerList.filter(center => center.id !== id);
            setCenterList([selectedCenter, ...otherCenters]);
        }
    }, [centerId, centerList, setCenterId, setCenterList]);

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
                      onValueChange={(centerId) => onCenterChange(centerId)}
                    //   onValueChange={(centerId) => setCenterId(centerId)}
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