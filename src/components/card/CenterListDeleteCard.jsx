import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import CenterAddGrayBtn from '../button/CenterAddGrayBtn';
import {deleteCenterList} from '../../api/trainersApi';
import { Alert } from 'react-native';

function CenterListDeleteCard({centerList,setCenterList,goSearchScreen}) {

    console.log('센터리스트',centerList)


    const deleteCenterBtn = async(id) => {
        console.log('센터삭제',id)
        try{
            const response = await deleteCenterList(id);
            if(response){
                Alert.alert("센터 삭제","센터가 삭제되었습니다",
                [{ text: "확인", onPress: () => setCenterList(centerList.filter(center => center.id !== id)) }]);
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <ScrollContainer
        bounces={false}
        showsVerticalScrollIndicator={false}   
        showsHorizontalScrollIndicator={false}
        overScrollMode="never">
         {centerList && centerList.map(center => (
             <CenterListContaniner key={center.id} onPress={()=>deleteCenterBtn(center.id)}>
             <CenterName>{center.name}</CenterName>
             <CenterDeleteText>삭제</CenterDeleteText>
             </CenterListContaniner>
         ))}
         <CenterAddGrayBtn onPress={goSearchScreen}>센터 추가</CenterAddGrayBtn>
         </ScrollContainer>
    );
}

export default CenterListDeleteCard;


const CenterListContaniner = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const CenterName = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

const CenterDeleteText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`;


const ScrollContainer = styled.ScrollView`
flex:1;
`

