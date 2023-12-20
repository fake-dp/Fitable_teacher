import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { ScrollView } from 'react-native';
import {getLessonDetail} from '../../api/lessonApi'
import { useNavigation } from '@react-navigation/native';
function LessonListGrid({lessonList}) {

    const navigation = useNavigation();

    const detailLessonScreen = async(id) => {
        console.log('상세 id확인',id)
        try{
            const response = await getLessonDetail(id);
            // console.log('상세 응답',response)
            if(response){
                navigation.navigate('LessonDetail', 
                {
                    lessonDetail: response,
                    
                });
            }
        }catch(error){
            console.log('error 뜸 ㅠㅠ', error)
        }
    }

    const nextIcon = require('../../assets/img/rightIcon.png');
    const personal = require('../../assets/img/personal_s.png');
    const group = require('../../assets/img/group_s.png');
    return (
      <>
            {
                lessonList.length === 0 ? (
                <NoListContainer>
                    <NoListText>일정이 없습니다</NoListText>
                </NoListContainer>
                ):(
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never">
                    <LessonListContainer>
                    {
                        lessonList.map((lesson, index) => (
                            <LessonCard key={lesson.id} onPress={()=>detailLessonScreen(lesson.id)}>
                                <LessonIcon source={lesson.type === 'PERSONAL' ? personal : group}/>
                                
                                <InnerLessonCard>
                                <LessonInfo> 
                                <LessonNameAndTrainer>{lesson.name} • {lesson.trainers.join(', ')} 강사</LessonNameAndTrainer>
                                <LessonTime>{lesson.startTime} ~ {lesson.endTime}</LessonTime>
                                {
                                    lesson.reservationMembers.memberName === null && lesson.reservationMembers.current === 0 ? (
                                        <MembersInfoText>아직 예약한 회원이 없습니다</MembersInfoText>
                                    ):(
                                        <MembersInfoContainer>
                                        <MembersInfoText>
                                        {lesson.reservationMembers.memberName} 회원
                                        </MembersInfoText>
                                        {
                                            lesson.reservationMembers.max && (
                                                <MembersInfoText>
                                                ({lesson.reservationMembers.current}/{lesson.reservationMembers.max})
                                                </MembersInfoText>
                                            )
                                        }
                                        {
                                            lesson.location === null ? (
                                                null
                                            ):(
                                                <MembersInfoText> | {lesson.location}</MembersInfoText>
                                            )
                                        }
                                        </MembersInfoContainer>
                                    )
                                }
                                </LessonInfo>

                                <LessonNextIcon source={nextIcon}/>
                                </InnerLessonCard>
                            </LessonCard>
                        ))
                    }
                </LessonListContainer>
                </ScrollView>
                )
            }
       </>
    );
}

export default LessonListGrid;

const LessonListContainer = styled.View`
    padding: 0 20px;
    background-color: ${COLORS.white};
`;

const LessonIcon = styled.Image`
margin-right: 20px;
`
const LessonNextIcon = styled.Image`
    width:20px;
    height:20px;
`


const LessonCard = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 33px;
`;

const LessonNameAndTrainer = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 12px;
    font-weight: 400;
`;

const LessonTime = styled.Text`
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 600;
    margin-top: 4px;
    margin-bottom: 2px;
`;

const LessonInfo = styled.View`
    flex-direction: column;
`;

const InnerLessonCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex:1;
`;


const MembersInfoText = styled.Text`
    font-size: 14px;
font-weight: 400;
line-height: 22.40px;
    color: ${COLORS.gray_400};
`;
const NoListContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.white};
`;

const NoListText = styled.Text`
 font-size: 16px;
color: ${COLORS.gray_300};
font-weight: 500;
line-height: 22.40px;
`;

const MembersInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
`