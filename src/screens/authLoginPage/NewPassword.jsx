import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled';
import EctInput from '../../components/input/EctInput';
import CertifiactionBtn from '../../components/button/CertificationBtn';

function NewPassword(props) {

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
             <GobackGrid 
                onPress={goBack}
            />
                 <TextContainer>
            <MainLongTextGrid>사용하실 새 비밀번호를</MainLongTextGrid>
            <MainLongTextGrid>입력해주세요</MainLongTextGrid>
            </TextContainer>

         
            <EctInput 
            text='비밀번호'
            placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리"
            />
            <EctInput 
             text='비밀번호 확인'
             placeholder="다시 입력해주세요"
            />

            <CertifiactionBtn
            >다음</CertifiactionBtn>

        </MainContainer>
    );
}

export default NewPassword;



const TextContainer = styled.View`
    margin-bottom: 50px;
`