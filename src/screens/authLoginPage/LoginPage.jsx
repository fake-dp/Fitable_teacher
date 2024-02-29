import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import { LoginContainer } from '../../style/gridStyled';
import MainBtn from '../../components/button/MainBtn';
import {AuthInput} from '../../components/input/AuthInput';
import { useState,useRef } from 'react';
import {loginApi} from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isLoginState,fcmTokenState } from '../../store/atom';
import FastImage from 'react-native-fast-image';
import { Alert,TouchableWithoutFeedback, Keyboard } from 'react-native';
// ST_A_1000
function LoginPage(props) {

    const navigation = useNavigation();
    const [fcmToken, setFcmToken] = useRecoilState(fcmTokenState);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // const tokenBtn = async () => {
    //     console.log('fkfkfkffk')
    //     const test = await AsyncStorage.getItem('accessToken');
    //     const test1 = await AsyncStorage.getItem('refreshToken');
    // console.log('토큰', test,'@@@@@',test1);
    // }
    console.log('fcmToken',fcmToken)
    const findPasswordScreen = () => {
        console.log('password찾기로')
        navigation.navigate('FindPassword');
    }

    const handleLogin = async () => {
        try {
            const response = await loginApi(phone, password, fcmToken);
            const isValidInput = phone.length > 10  && password.length > 7;
            if (response && isValidInput) {
                setIsLoggedIn(true);
            } 
        } catch (error) {
            console.log('Error during login@@:',error.response.data);
            if(error.response.data.code === 10202){
              Alert.alert('올바른 비밀번호로 입력해주세요.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
            }else if(error.response.data.code === 20000){
              Alert.alert('권한이 없는 계정입니다.', '', [{ text: '확인', onPress: () => console.log('실패') }]);
            }
    }
};


    const isInputValid = phone.length > 10  && password.length > 7;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LoginContainer>
        <LoginScreenView focus={isFocused}>
            <TitleLogo source={require('../../assets/img/t_logo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="휴대폰번호"
             maxLength={11}
             ref={inputRef}
             onFocus={handleFocus}
             onBlur={handleBlur}
            />

              <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
              onSubmitEditing={handleLogin}
              maxLength={16}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <MainBtn
             onPress={handleLogin}
             colorProp={isInputValid}
            >로그인</MainBtn>

            <FindPasswordContainer
                onPress={()=>findPasswordScreen()}
            >
                <FindPassword>비밀번호 찾기</FindPassword>
            </FindPasswordContainer>
            </LoginScreenView>
        </LoginContainer>
        </TouchableWithoutFeedback>
    );
}

export default LoginPage;

const TitleLogo = styled(FastImage)`
    margin-bottom: 50px;
    width: 180px;
    height: 26px;
`
const LoginScreenView = styled.View`
    /* flex: .9; */
    flex: ${props => props.focus ? 0.88 : 1};
    background-color: ${COLORS.white};
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
`
const FindPasswordContainer = styled.TouchableOpacity`
    align-items: center;
    margin-top: 20px;
    margin-bottom: 80px;
`

const FindPassword = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 14px;
    font-family: Pretendard;
    font-weight: 400;
    line-height: 22.40px;
`