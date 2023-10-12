import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {MainContainer} from '../../style/gridStyled'
import { COLORS } from '../../constants/color';
import GobackGrid from '../../components/grid/GobackGrid';
import InfoEditInput from '../../components/input/InfoEditInput';
import styled from 'styled-components/native';
import CertifiactionBtn from '../../components/button/CertificationBtn';
import {updateMyInfo} from '../../api/mypageApi'
import { validatePassword } from '../../utils/CustomUtils';
import { Alert } from 'react-native';
import { ErrorText } from '../../style/gridStyled';

function AccountScreen(props) {

    const navigation = useNavigation();


    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const handleNameTextChange = (text) => {
        console.log('이름 입력 값 확인',text)
        setName(text);
    }

    const handlePasswordTextChange = (text) => {
        console.log('비밀번호 입력 값 확인',text)
        setPassword(text);
    }

    const handlePasswordCheckTextChange = (text) => {
        console.log('비밀번호 확인 입력 값 확인',text)
        setPasswordCheck(text);
    }

        // 비밀번호 검증
    const validatePasswordInput = (password) => {
    const isValid = validatePassword(password);
    setPasswordError(isValid && password.length > 1 ? '' : '영어 소문자, 숫자, 특수문자 포함 8자리~16자리로 설정해주세요');
  };



    const goBack = () => {
        navigation.goBack();
    }

    const goChangeNumberScreen = () => {
        navigation.navigate("ChangePhoneNumber");
    }

    const isSamePassword = password === passwordCheck;
 
    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>계정 관리</GobackGrid>

            <InfoEditInput 
            title="이름" 
            placeholder="10자까지 입력해주세요" 
            value={name}
            onChangeText={handleNameTextChange}
            />


            <InfoEditInput 
            title="비밀번호 변경" 
            placeholder="영어 소문자, 숫자, 특수문자 포함 8자리~16자리" 
            value={password}
            onChangeText={handlePasswordTextChange}
            onBlur={()=>validatePasswordInput(password)}
            hasError={!!passwordError} 
            />
            {
                   passwordError &&  
                   <ErrorTextContainer  key={passwordError}>
                   <ErrorText>{passwordError}</ErrorText> 
                   </ErrorTextContainer>
            }
            <InfoEditInput 
            title="비밀번호 확인" 
            placeholder="다시 입력해주세요"
            value={passwordCheck}
            onChangeText={handlePasswordCheckTextChange}
            hasError={!isSamePassword && passwordCheck.length > 7} 
            />
             {
                   !isSamePassword && passwordCheck.length > 7 &&
                   <ErrorTextContainer>
                   <ErrorText>비밀번호가 일치하지 않습니다</ErrorText> 
                   </ErrorTextContainer>
            }

            <EditNumberBtn onPress={goChangeNumberScreen}>
                <EditNumberBtnText>휴대폰번호 변경</EditNumberBtnText>
            </EditNumberBtn>

            <CertifiactionBtn>확인</CertifiactionBtn>
        </MainContainer>
    );
}

export default AccountScreen;

const EditNumberBtn = styled.TouchableOpacity`
align-self: flex-start;
margin-top: 23px;
`

const EditNumberBtnText = styled.Text`
color: ${COLORS.gray_300};
font-size: 12px;
font-weight: 500;
text-decoration: underline;
line-height: 19.20px;
text-decoration-color: ${COLORS.gray_300};
`

const ErrorTextContainer = styled.View`
    width: 100%;
    margin-top: 3px;
    /* margin-bottom: 12px; */
`;