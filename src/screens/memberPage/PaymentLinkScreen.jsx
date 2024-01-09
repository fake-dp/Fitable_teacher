import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import MemberRegisterGrid from '../../components/grid/MemberRegisterGrid';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function PaymentLinkScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }

    const { memberInfo = {}, type = '' } = route.params || {};

    console.log('dkdk나넘어왓와오옹ㅁ',memberInfo,type)
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [name, setName] = useState(type? memberInfo.name : '');
    const [selectedGender, setSelectedGender] = useState(type? memberInfo.genderType : 'MALE');
    const [phone, setPhone] = useState(type? memberInfo.phone:null);

    const [bookmarkTickets, setBookmarkTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectTicketId, setSelectTicketId] = useState(null);
    const [date, setDate] = useState(new Date());
    const initstartDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

    const initialFormData = {
        centerId: centerId || '',
        name,
        genderType:selectedGender,
        phone,
        tickets: [],
    };
    
    const [formData, setFormData] = useState(initialFormData);

    const addTicket = () => {
      setFormData((prevData) => ({
        ...prevData,
        tickets: [
          ...prevData.tickets,
          {
            id: '',
            time: null,
            period: null,
            periodType: null,
            startDate: initstartDate,
            endDate: '',
            stopTicketDay: 0,
            stopTicketTime: 0,
            couponId: '',
            paymentType: null,
            salePrice: 0,
            receivedPrice: 0,
          },
        ],
      }));
    };


    return (
      <MainContainer>
            <GobackGrid onPress={goBack}>결제링크 전송</GobackGrid>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            extraScrollHeight={10}
            >
            
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
            addTicket={addTicket}
            formData={formData}setFormData={setFormData}
            selectTicketId={selectTicketId}
            setSelectTicketId={setSelectTicketId}
            />
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        </MainContainer>
    );
}

export default PaymentLinkScreen;