import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {GridLineOne} from '../../style/gridStyled'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MemberDetailHeader from '../../components/grid/MemberDetailHeader';
import { ScrollView , Alert} from 'react-native';
import MemberBtn from '../../components/button/MemberBtn';
import {cancelLessonReservation, postLessonAttendance} from '../../api/lessonApi';

function ClassMemberDetailScreen(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const { detailData,screenType } = route.params;

    console.log('나 넘어왔엉!', detailData,screenType)

    const cancelReservationBtn = async(id) => {
        try{
            const response = await cancelLessonReservation(id);
            if(response){
                Alert.alert("예약 취소","예약이 취소되었습니다",
                    [{ text: "확인", onPress: () => navigation.navigate('Schedule')}]);
                }else{
                    return;
                }
        }catch(error){
            console.log('예약취소 에러',error)
        }
    }

    const postLessonAttendanceBtn = async(id) => {
        try{
            const response = await postLessonAttendance(id);
            if(response){
                Alert.alert("출석","출석으로 변경되었습니다",
                    [{ text: "확인", onPress: () => navigation.navigate('Schedule')}]);
            }else{
                return;
            }
        }catch(error){
            console.log('출석처리 에러',error)
        }
    }


    return (
        <Container>
            <MemberDetailHeader detailData={detailData}/>
            <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            >
               <ContentsContainer>
                <UseCenterContainer>
                    <TitleText>이용 센터</TitleText>
                    {
                        detailData?.availableCenters.length !==  0 ? 
                        <SubContentText>{detailData.availableCenters.join(', ')}</SubContentText> 
                      : <SubContentText>-</SubContentText> 
                    }
                    
                </UseCenterContainer>

                <GridLineOne />

                <MemoContainer>
                    <TitleText>메모</TitleText>
                    {
                        detailData.memos.length === 0 ?
                        <SubContentText>-</SubContentText>
                        : null
                    }
                    {
                        detailData.memos.map((memo, index) => (
                            <MemoInnerBox key={index}>
                                <HeaderBox>
                                    <MemoTitleLabel>
                                        <MemoTitleText>{memo.centerName}</MemoTitleText>
                                    </MemoTitleLabel>
                                        
                                <MemoDateText>{memo.createdAt}</MemoDateText>
                                </HeaderBox>
                                <MemoSubContentBox>
                                <SubContentText>{memo.context}</SubContentText>
                                </MemoSubContentBox>
                            </MemoInnerBox>
                            )
                        )
                    }
                </MemoContainer>

               </ContentsContainer>

            <TicketContainer>
                <TitleText>보유 이용권</TitleText>
                {detailData.tickets.map((ticket, index) => (
                    <TicketInfo key={index}
                    isExpired={ticket.status === 'EXPIRED'}
                    >
                        <HeaderBox>
                        <TicketInfoTitle isExpired={ticket.status === 'EXPIRED'}>{ticket.name}</TicketInfoTitle>
                        {
                            ticket.status === 'EXPIRED' ? null :  <TicketStatus>잔여 {ticket.left}</TicketStatus>
                        }
                        </HeaderBox>
                        <TicketDateText isExpired={ticket.status === 'EXPIRED'}>{ticket.startDate} ~ {ticket.endDate}</TicketDateText>
                    </TicketInfo>
                ))}
            </TicketContainer>
                       
                <BtnContainer>
                    {
                        detailData.isAvailableCancel &&  
                        <MemberBtn
                        onPress={() =>cancelReservationBtn(detailData.id)}
                        colorProp>예약취소</MemberBtn>
                    }
                   {
                        detailData.isAvailableAttendance &&
                        <MemberBtn
                        onPress={() =>postLessonAttendanceBtn(detailData.id)}
                        colorProp>출석처리</MemberBtn>
                   }
                </BtnContainer>

            </ScrollView>
        </Container>
    );
}

export default ClassMemberDetailScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const ContentsContainer = styled.View`
    padding: 0 20px;
`

const UseCenterContainer = styled.View`
    flex-direction: column;
    margin-top: 30px;
`;


const TitleText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${COLORS.sub};
`;

const SubContentText = styled.Text`
font-size: 14px;
font-weight: 400;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-top: 5px;
`
const MemoSubContentBox = styled.View`
margin-bottom: 20px;
`

const TicketContainer = styled.View`
    background-color: ${COLORS.gray_100};
    padding: 30px 20px;
`

const MemoContainer = styled.View`
    flex-direction: column;
    margin-bottom: 19px;
`

const MemoInnerBox = styled.View`
    margin-top: 17px;
`;

const HeaderBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const MemoDateText = styled.Text`
  font-size: 14px;
  color: ${COLORS.gray_300};
  font-weight: 400;
  line-height: 22.40px; 
`;

const MemoTitleLabel = styled.View`
    padding: 7px 11px;
    background-color: ${COLORS.white};
    border-radius: 80px;
    border: 1px solid ${COLORS.gray_400};
    margin-bottom: 5px;
`;

const MemoTitleText = styled.Text`
    font-size: 12px;
    font-weight: 400;
    color: ${COLORS.gray_400};
`;


const TicketInfo = styled.View`
    margin-top: 10px;
    border: 1px solid ${props => props.isExpired ? COLORS.gray_200 : COLORS.white};
    background-color: ${props => props.isExpired ? COLORS.gray_200 : COLORS.white};
    padding: 18px 16px;
    border-radius: 13px;
`;

const TicketInfoTitle = styled.Text`
    font-size: 16px;
    font-weight: 600;
    line-height: 22.40px;
    color: ${props => props.isExpired ? COLORS.gray_300 : COLORS.gray_400};
`;


const TicketDateText = styled.Text`
    margin-top: 5px;
    font-size: 12px;
    color: ${props => props.isExpired ? COLORS.gray_300 : COLORS.gray_400};
    font-weight: 500;
    line-height: 19.20px;
`;

const TicketStatus = styled.Text`
    font-size: 14px;
    color: ${COLORS.gray_400};
    font-weight: 400;
    line-height: 22.40px;
`;

const BtnContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
`