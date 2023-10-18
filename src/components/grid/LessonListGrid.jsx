import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { ScrollView } from 'react-native';
function LessonListGrid({lessonList}) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"

        >
        <LessonListContainer>
            {
                lessonList.map((lesson, index) => (
                    <LessonCard key={lesson.id}>
                        <LessonName>{lesson.name}</LessonName>
                        <LessonTime>{lesson.startTime} ~ {lesson.endTime}</LessonTime>
                        <LessonInfo>
                            <Location>{lesson.location}</Location>
                            <Type>{lesson.type}</Type>
                        </LessonInfo>
                        <Trainers>Trainers: {lesson.trainers.join(', ')}</Trainers>
                        <Members>Reservation: {lesson.reservationMembers.current}/{lesson.reservationMembers.max}</Members>
                    </LessonCard>
                ))
            }
        </LessonListContainer>
        </ScrollView>
    );
}

export default LessonListGrid;

const LessonListContainer = styled.View`
    padding: 0 20px;
    background-color: ${COLORS.white};
`;

const LessonCard = styled.View`
    border: 1px solid ${COLORS.gray};
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
`;

const LessonName = styled.Text`
    font-size: 18px;
    color: ${COLORS.sub};
    font-weight: bold;
`;

const LessonTime = styled.Text`
    color: ${COLORS.gray_100};
    margin-top: 5px;
`;

const LessonInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

const Location = styled.Text`
    color: ${COLORS.gray_200};
`;

const Type = styled.Text`
    color: ${COLORS.gray_200};
`;

const Trainers = styled.Text`
    margin-top: 5px;
    color: ${COLORS.gray_300};
`;

const Members = styled.Text`
    margin-top: 5px;
    color: ${COLORS.gray_300};
`;
