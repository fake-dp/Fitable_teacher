import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import {GridLineGrayOne}from '../../style/gridStyled';
import MemberTicketSelectCard from '../card/MemberTicketSelectCard';
import MemberDateSelectCard from '../card/MemberDateSelectCard';
import PaymentGridCard from '../card/PaymentGridCard';
import { useState } from 'react';
function MemberTicketsInfoGrid({type,ticket,bookmarkTickets,
  setSelectedTicket,setFormData,selectedTicket,index,selectTicketId,setSelectTicketId}) {

    const [timeAndPeriod, setTimeAndPeriod] = useState([]);

  console.log('type있냐',index,selectTicketId[index].id,selectTicketId,timeAndPeriod[index]?.price)
  console.log('timeAndPeriod[index].pricetimeAndPeriod[index].price',timeAndPeriod[index]?.price)
    return (
        <>
          
                <SelectedTicketContainer>
               
               <MemberTicketSelectCard 
                index={index}
                ticketId={selectTicketId}
                setFormData={setFormData}
                selectedTicket={selectedTicket}
                bookmarkTickets={bookmarkTickets}
                setSelectedTicket={setSelectedTicket}
                setSelectTicketId={setSelectTicketId}
                timeAndPeriod={timeAndPeriod}
                setTimeAndPeriod={setTimeAndPeriod}
               />
                </SelectedTicketContainer>

                <GridLineGrayOne/>

               <MemberDateSelectCard 
               setFormData={setFormData}
               index={index}
               />
                
                <GridLineGrayOne/>
            
                <PaymentGridCard 
                index={index}
                setFormData={setFormData}
                type={type}
                timeAndPeriod={timeAndPeriod[index]?.price}
                />
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
`;
