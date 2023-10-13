import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { ScrollView , Alert} from 'react-native';
import {getLessonDetail} from '../../api/lessonApi'
import { useNavigation } from '@react-navigation/native';
function AlarmLessonListGrid({lessonList}) {

    const navigation = useNavigation();

    const personal = require('../../assets/oneperson.png');
    const group = require('../../assets/otherperson.png');
    const detailLessonScreen = async(id) => {
        // console.log('상세 id확인',id)
        try{
            const response = await getLessonDetail(id);
            console.log('상세 응답',response)
            if(response){
                navigation.navigate('LessonDetail', {lessonDetail: response});
            }
        }catch(error){
            console.log('error 뜸 ㅠㅠ', error)
        }
    }

    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false} overScrollMode="never">
        <Container>
        {lessonList.map((item) => (
            <DateGroup key={item.date}>
                <DateText>{item.date}</DateText>
                {item.alarms.map((alarm) => (
                <AlarmItem key={alarm.id} onPress={()=>detailLessonScreen(alarm.path)}>
                    {/* {
                        alarm.type === 'PERSONAL' ? (<ConsultIcon source={personal}/>):
                        alarm.type === 'GROUP' ?(<ConsultIcon source={group}/>) : null
                        
                    } */}
                    <ConsultIcon source={personal}/>
                 
                    
                    <ContentsBoxContainer>
                    <ContentsContainer>
                    <TitleText>수업 예약</TitleText>
                    <TimeText>{alarm.time}</TimeText>
                    </ContentsContainer>
                    <AlarmText>{alarm.context}</AlarmText>
                    </ContentsBoxContainer>
                </AlarmItem>
                ))}
            </DateGroup>
        ))}
    </Container>
    </ScrollView>
    );
}

export default AlarmLessonListGrid;

const Container = styled.View`
  margin-top: 10px;
`;

const DateGroup = styled.View`
  margin-bottom: 20px;
`;

const DateText = styled.Text`
font-size: 20px;
color: ${COLORS.sub};
font-weight: 700;
line-height: 30px;
margin-bottom: 10px;
`;

const AlarmItem = styled.TouchableOpacity`
display: flex;
flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.gray_100};
  padding: 15px 0;
`;

const ContentsContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const ContentsBoxContainer = styled.View`
margin-left: 20px;
flex: 1;
`

const TitleText = styled.Text`
  color: ${COLORS.sub};
  font-size: 16px;
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
  `

const AlarmText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
font-weight: 400;
line-height: 22.40px;
`;

const TimeText = styled.Text`
  color: ${COLORS.gray_300};
  font-size: 12px;
font-weight: 400;
`;

const ConsultIcon = styled.Image`
`   