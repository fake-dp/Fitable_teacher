import ProfileInput from '../input/ProfileInput';
import GenderSelectBtn from '../button/GenderSelectBtn';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import MemberPhoneInfo from '../input/MemberPhoneInfo';
import { COLORS } from '../../constants/color';
import styled from 'styled-components/native';
import {GridLineGrayOne}from '../../style/gridStyled';
import BookmarkTicketModal from '../modal/BookmarkTicketModal';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getBookmarkTickets} from '../../api/memberApi';
import MemberTicketsInfoGrid from './MemberTicketsInfoGrid';
function MemberRegisterGrid({memberInfo,type,name, setName,selectedGender,setSelectedGender,phone, setPhone,bookmarkTickets, setBookmarkTickets,selectedTicket, setSelectedTicket,selectTicketId, setSelectTicketId}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [centerId, setCenterId] = useRecoilState(centerIdState);


    const closeModal = () => {
      setModalVisible(false);
    };

    const openBookmarkTicketModal = async() => {
        try{
            const response = await getBookmarkTickets(centerId);
            console.log('response',response.content)
            if(response){
                setBookmarkTickets(response.content);
                setModalVisible(true);
            }
        }catch(error){
            console.log('error',error)
        }

    }


console.log('selectedTicketselectedTicketselectedTicket111',selectedTicket)



// console.log('bname',name, selectedGender, phone)
    const addbtn = require('../../assets/img/pluscircle.png');

    return (
        <ScrollView>
            <ProfileInput 
                type={type}
                title={'이름'}
                onChangeText={setName}
                setName={setName}
                maxLength={10} 
                value={name}
                placeholder={type === 'paylink' ? memberInfo?.name : '회원명'}
            />

            <GenderSelectBtn 
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            />

            <MemberPhoneInfo 
            setPhone={setPhone}
            phone={phone}
            type={type}
            />

            <GridLineGrayOne/>
            {
                selectedTicket &&
                 <MemberTicketsInfoGrid selectedTicket={selectedTicket}/>
            }


            <AddBtnContainer onPress={openBookmarkTicketModal}>
                <AddbtnBox>
                    <AddbtnIcon source={addbtn}/>
                    <AddBtnText>이용권 추가</AddBtnText>
                </AddbtnBox>
            </AddBtnContainer>
            {
            <BookmarkTicketModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            type={type}
            bookmarkTickets={bookmarkTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            />
        }
        </ScrollView>
    );
}

export default MemberRegisterGrid;

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

