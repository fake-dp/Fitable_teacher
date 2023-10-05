import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled';
import EctInput from '../../components/input/EctInput';
import MainBtn from '../../components/button/MainBtn';
import CertifiactionBtn from '../../components/button/CertificationBtn';
function FindPassword(props) {

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    const goNewPassowrdScreen = () => {
        navigation.navigate('NewPassword');
    }


    return (
        <MainContainer>
            <GobackGrid 
                onPress={goBack}
            />
            <TextContainer>
            <MainLongTextGrid>휴대폰번호 인증으로</MainLongTextGrid>
            <MainLongTextGrid>비밀번호를 다시 설정합니다</MainLongTextGrid>
            </TextContainer>
        
            <EctInput 
            text='이름'
            placeholder="이름을 입력해주세요"
            />
            <EctInput 
             text='휴대폰번호'
             placeholder="-없이 번호를 입력해주세요"
            />

            <CertifiactionBtn
            onPress={goNewPassowrdScreen}
            >인증번호 받기</CertifiactionBtn>
        </MainContainer>
    );
}

export default FindPassword;



const TextContainer = styled.View`
    margin-bottom: 50px;
`