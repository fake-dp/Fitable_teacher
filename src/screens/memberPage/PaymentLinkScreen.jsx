import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MemberRegisterGrid from '../../components/grid/MemberRegisterGrid';
import { useState } from 'react';
function PaymentLinkScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }

    const {memberInfo, type} = route.params;

    const [name, setName] = useState(type? memberInfo.name : '');
    const [selectedGender, setSelectedGender] = useState(type? memberInfo.genderType : 'EMALE');
    const [phone, setPhone] = useState(type? memberInfo.phone:null);

    const [bookmarkTickets, setBookmarkTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectTicketId, setSelectTicketId] = useState(null);

    console.log('dkdk나넘어왓와오옹ㅁ',memberInfo,type)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
            <GobackGrid onPress={goBack}>결제링크 전송</GobackGrid>
            <MemberRegisterGrid 
            name={name}
            setName={setName}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            phone={phone}
            setPhone={setPhone}
            memberInfo={memberInfo} type={type}
            bookmarkTickets={bookmarkTickets}
            setBookmarkTickets={setBookmarkTickets}
            selectedTicket={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            />
        </MainContainer>
        </TouchableWithoutFeedback>
    );
}

export default PaymentLinkScreen;