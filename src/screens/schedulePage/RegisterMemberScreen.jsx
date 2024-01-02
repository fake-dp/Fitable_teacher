import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MemberRegisterGrid from '../../components/grid/MemberRegisterGrid';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { useState } from 'react';
function RegisterMemberScreen(props) {

    const navigation = useNavigation();
    // const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }

    const [name, setName] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [phone, setPhone] = useState('');

    const [bookmarkTickets, setBookmarkTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectTicketId, setSelectTicketId] = useState(null);

    const registerBtn = () => {
        if(name && selectedGender && phone.length===11){
            console.log('ddd')
            // navigation.navigate('PaymentLink',{memberInfo:{name,genderType:selectedGender,phone}})
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
            <HeaderContainer>
            <GobackGrid onPress={goBack}>회원 등록</GobackGrid>
            <RegisterBtn onPress={registerBtn}>
            <HeaderText isActive={name && selectedGender && phone.length===11}>등록</HeaderText>
            </RegisterBtn>
            </HeaderContainer>

            <MemberRegisterGrid 
            name={name}
            setName={setName}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            phone={phone}
            setPhone={setPhone}
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
export default RegisterMemberScreen;

const HeaderContainer = styled.View`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
`

const RegisterBtn = styled.TouchableOpacity`
 
`

const HeaderText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.isActive ? COLORS.sub : COLORS.gray_300};
`;