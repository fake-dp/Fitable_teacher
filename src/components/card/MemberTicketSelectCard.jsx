
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {getMemberConditions} from '../../api/memberApi';
function MemberTicketSelectCard({ticketId,bookmarkTickets,
    setSelectedTicket,setFormData,selectedTicket, timeAndPeriod, setTimeAndPeriod,index,setSelectTicketId}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/caretdownblack.png');
  
    const [currentTicketId, setCurrentTicketId] = useState(ticketId[index].id);

    const pickerRef = useRef();
    const secPickerRef = useRef();
    const trPickerRef = useRef();

    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };

    const openSecPicker = () => {
        secPickerRef.current?.togglePicker(true);
    };

    const openTrPicker = () => {
        trPickerRef.current?.togglePicker(true);
    };


      const transformedBookmarkTickets = bookmarkTickets.map(ticket => ({
        label: ticket.name,
        value: ticket.id,
      }));

      const transformedTimeAndPeriodTickets = timeAndPeriod.map(ticket => ({
        label: ticket.limit ? `${ticket.registration}(${ticket.limit})` : `${ticket.registration}`,
        value: ticket.id,
      }));
  
    // console.log('timeSettings',timeSettings)
    const changeTicketId = (index, newId) => {
        console.log('newId',newId,index)
        const newTicket = bookmarkTickets.find(ticket => ticket.id === newId);
    
        if (newTicket) {
            setSelectTicketId(prevIds => prevIds.map((ticket, i) => {
                if (i === index) {
                    return newTicket;
                }
                return ticket;
            }));
        }
        getMemberConditionsData(newId);
      };
      
      const getMemberConditionsData = async (id) => {
        try {
          const response = await getMemberConditions(id);
          console.log('response',response)
          if (response) {
            setTimeAndPeriod(response);
          }
        } catch (error) {
          console.log('error',error);
        }
      }


      useEffect(() => {
        // 초기 호출인 경우 selectTicketId[index].id 값을 사용하고,
        // 그 이후 호출인 경우 newId 값을 사용
        if (ticketId[index].id !== undefined) {
            getMemberConditionsData(ticketId[index].id);
        } else {
            getMemberConditionsData(newId);
        }
    }, [ticketId[index].id]);

    const periodTypeItem = [
        {
            label: '개월',
            value: 'MONTH',
        },
        {
            label: '일',
            value: 'DAY',
        },
    ]


    return (
        <>
        <Container>
            <InfoTitleText>이용권</InfoTitleText>
            <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                      ref={pickerRef}
                        doneText="변경"
                        value={ticketId[index].id}
                        onValueChange={(newId) => changeTicketId(index, newId)}
                        items={transformedBookmarkTickets}
                        placeholder={{}}
                        style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' },placeholder: { color: COLORS.sub }  }}/>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
        </Container>

        <Container>
             <InfoTitleText>기간 & 횟수</InfoTitleText>
            <SelectBoxDivider onPress={openSecPicker}>
                    <RNPickerSelect
                      ref={secPickerRef}

                        doneText="변경"
                        value={currentTicketId}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].id = value;
                                return {...prevData, tickets};
                            });
                            setCurrentTicketId(value);
                        }}
                        items={transformedTimeAndPeriodTickets}
                        placeholder={{}}
                        style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
                <RigthIcon source={rightIcon}/>
             </SelectBoxDivider>
        </Container>


        <Container>
        <InfoTitleText>횟수 변경</InfoTitleText>
                    <CountTextInput 
                    keyboardType='numeric'
                    placeholder="횟수"
                    onChangeText={(text) => {
                        setFormData((prevData) => {
                            let tickets = [...prevData.tickets];
                            tickets[index].time = text;
                            return {...prevData, tickets};
                        });
                    }}
                    />
        </Container>



        <Container>
        <InfoTitleText>기간 변경</InfoTitleText>

                    <SelectInnerSecondBox>
                    
                            <CountDateTextInput
                             keyboardType='numeric'
                             placeholder="0"
                             onChangeText={(text) => {
                                 setFormData((prevData) => {
                                     let tickets = [...prevData.tickets];
                                     tickets[index].period = text;
                                     return {...prevData, tickets};
                                 });
                             }}
                            />
               


            <SelectTextInputSecondContainer onPress={openTrPicker}>
                    <RNPickerSelect
                        ref={trPickerRef}
                        doneText="변경"
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].periodType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={periodTypeItem}
                        placeholder={{
                            label: '개월/일',
                            value: null,
                        }}
                        style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
                        <RigthIcon source={rightIcon}/>
             </SelectTextInputSecondContainer>
                </SelectInnerSecondBox>
        </Container>
        </>
    );
}

export default MemberTicketSelectCard;


const Container = styled.View`
margin-bottom: 26px;
`

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22px;
 margin-bottom: 8px;
`;

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
`

const SelectBoxDivider = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 50%;
`


const SelectTextInputSecondContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 48%;
`


const SelectInnerSecondBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 50%;
`

const RigthIcon = styled.Image``

const CountTextInput = styled.TextInput`
    text-align: right;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 50%;
`

const CountDateTextInput = styled.TextInput`
    text-align: right;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
    width: 48%;
`