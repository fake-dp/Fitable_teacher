import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import {GridLineGrayOne}from '../../style/gridStyled';
function MemberTicketsInfoGrid({selectedTicket}) {
    return (
        <>
            <InfoTitleText>이용권</InfoTitleText>
                <SelectedTicketContainer>
                    <SelectedTicketText>
                        {/* {selectedTicket.name} */}
                        {selectedTicket.name.length > 16 ? selectedTicket.name.substring(0, 16) + "..." : selectedTicket.name}
                        </SelectedTicketText>
                </SelectedTicketContainer>
                <InfoTitleText>기간 & 횟수</InfoTitleText>
                <InfoTitleText>횟수 변경</InfoTitleText>
                <InfoTitleText>기간 변경</InfoTitleText>
                <GridLineGrayOne/>
        </>
    )
}

export default MemberTicketsInfoGrid;


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22px;
`;

const SelectedTicketContainer = styled.View`
  margin-top: 8px;
  padding: 14px 16px;
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
`;

const SelectedTicketText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${COLORS.sub};
`;