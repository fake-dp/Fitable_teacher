import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import {getLessonReservationMembers,getLessonMemberDetail} from '../../api/lessonApi';

function DetailLessonCommonGrid({lessonDetail,routerType}) {

    const navigation = useNavigation();

    console.log('routerTyperouterType',routerType)



    const selectMemberScreen = async(id) => {
        console.log('상세아이디 확인1',id)
            try{
                const response = await getLessonReservationMembers(id);
                // console.log('회원 선택 응답',response)
                navigation.navigate('MemberSelect',{
                    selectData: response.content,
                    lessonId: id,
                })
            }catch{
                console.log('error 뜸 ㅠㅠ', error)
            }
    }

    const memberDetailScreen = async(id) => {
        console.log('id',id)
        try{
            const response = await getLessonMemberDetail(id);
            console.log('회원 상세 응답@@',response)
            navigation.navigate('ClassMemberDetail',{
                detailData: response,
                screenType: 'class',
            })
        }catch(error){
            console.log('error 뜸 ㅠㅠ', error)
        }

    }

    const personal = require('../../assets/activeperson.png');
    const group = require('../../assets/activegroup.png');
    const addbtn = require('../../assets/pluscircle.png');

    return (
        <InfoGroup>
            <DetailHeaderContainer>
                <DateTitle>{lessonDetail.date}</DateTitle>
                {
                    lessonDetail.type === 'PERSONAL' ? (<IconImg source={personal}/>) : 
                    lessonDetail.type === 'GROUP' ? (<IconImg source={group}/>) : null
                }
            </DetailHeaderContainer>

                <DetailContentContainer>
                    <DetailContent>
                    <DetailContentTitle>수업명</DetailContentTitle>
                    <DetailContentText>{lessonDetail.name}</DetailContentText>
                    </DetailContent>

                    <DetailContent>
                    <DetailContentTitle>시간</DetailContentTitle>
                    <DetailContentText>{lessonDetail.startTime} ~ {lessonDetail.endTime} </DetailContentText>
                    </DetailContent>

                    <DetailContent>
                    <DetailContentTitle>장소</DetailContentTitle>
                    <DetailContentText>{lessonDetail.location}</DetailContentText>
                    </DetailContent>
                </DetailContentContainer>

         <ReservationInfoContainer>
            <ReservationInfo>참가회원</ReservationInfo>
            {
                lessonDetail.reservationInfo.max && (<ReservationInfo>({lessonDetail.reservationInfo.current} / {lessonDetail.reservationInfo.max})</ReservationInfo>)
            }
        </ReservationInfoContainer>  
        <ScrollContainer
       bounces={false}
       showsVerticalScrollIndicator={false}   
       showsHorizontalScrollIndicator={false}
       overScrollMode="never">
        {lessonDetail.members && lessonDetail.members.map(member => (
            <MembersListContaniner key={member.id} onPress={()=>memberDetailScreen(member.id)}>
            <MemberName>{member.name}</MemberName>
            </MembersListContaniner>
        ))}
            <AddBtnContainer onPress={()=>selectMemberScreen(lessonDetail.id)}>
                <AddbtnBox>
                    <AddbtnIcon source={addbtn}/>
                    <AddBtnText>회원 선택</AddBtnText>
                </AddbtnBox>
            </AddBtnContainer>
        </ScrollContainer>
    </InfoGroup>
    );
}

export default DetailLessonCommonGrid;


const InfoGroup = styled.View`
    flex:1;
`;

const DetailHeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 57px;
`

const DateTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: ${COLORS.sub};
`;


const IconImg = styled.Image`
`;

const DetailContentContainer = styled.View``

const DetailContent = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`

const DetailContentTitle = styled.Text`
font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
`

const DetailContentText = styled.Text`
font-size: 16px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`

const ReservationInfo = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
margin-bottom: 20px;
`;

const MembersListContaniner = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 12px;
`;

const MemberName = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

const AddBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 22px;
`;

const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const AddbtnIcon = styled.Image`
    margin-right: 8px;
`

const AddBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.sub};
font-weight: 400;
line-height: 22.40px;
`

const ReservationInfoContainer = styled.View`
display: flex;
flex-direction: row;
`

const ScrollContainer = styled.ScrollView`
flex:1;
`

