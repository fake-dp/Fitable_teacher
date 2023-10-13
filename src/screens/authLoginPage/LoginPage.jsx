import styled from 'styled-components/native';
import {COLORS} from '../../constants/color';
import { LoginContainer } from '../../style/gridStyled';
import MainBtn from '../../components/button/MainBtn';
import AuthInput from '../../components/input/AuthInput';
import { useState } from 'react';
import {loginApi} from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { isLoginState } from '../../store/atom';
import { Alert } from 'react-native';
// ST_A_1000
function LoginPage(props) {

    const navigation = useNavigation();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);
    

    // const tokenBtn = async () => {
    //     console.log('fkfkfkffk')
    //     const test = await AsyncStorage.getItem('accessToken');
    //     const test1 = await AsyncStorage.getItem('refreshToken');
    // console.log('토큰', test,'@@@@@',test1);
    // }

    const findPasswordScreen = () => {
        console.log('password찾기로')
        navigation.navigate('FindPassword');
    }


    const handleLogin = async () => {
        try {
            const response = await loginApi(phone, password); // 로그인 함수 호출
    
            // if (!response) {
            //     return Alert.alert('로그인 실패하였습니다.', '', [{ text: '확인', onPress: () => console.log('서버 응답 없음') }]);
            // }
            console.log('값확인',password,phone)
            const isValidInput = phone.length > 5 && password.length > 1;
    
            if (response && isValidInput) {
                // console.log('response@', response)
                const { accessToken, refreshToken } = response;
                 await AsyncStorage.setItem("accessToken", accessToken);
                 await AsyncStorage.setItem("refreshToken", refreshToken);
                      const test = await AsyncStorage.getItem('accessToken');
        const test1 = await AsyncStorage.getItem('refreshToken');
    console.log('토큰', test,'@@@@@',test1);
               
                // setMyPhone(phone);
                setPhone('');
                setPassword('');
                setIsLoggedIn(true);
                // return Alert.alert('로그인 성공하였습니다.', '', [{ text: '확인', onPress: () => setIsLoggedIn(true) }]);
            } 
        } catch (error) {
            console.log('Error during login@@:', error.code);
            if(error.code === 10202){
              Alert.alert('로그인 정보를 다시 확인해주세요', '', [{ text: '확인', onPress: () => console.log('실패') }]);
            }
        else if(error.code === 10200){
          Alert.alert('로그인 정보를 다시 확인해주세요', '', [{ text: '확인', onPress: () => console.log('실패') }]);
        }
    }
};


    const isInputValid = phone.length > 5  && password.length > 1;

    return (
        <LoginContainer>
            <TitleLogo source={require('../../assets/t_logo.png')}/>
            <AuthInput
             value={phone}
             onChangeText={setPhone}
             placeholder="휴대폰번호"
            />

              <AuthInput
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호"
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
        </LoginContainer>
    );
}

export default LoginPage;

const TitleLogo = styled.Image`
    margin-bottom: 50px;
`

const FindPasswordContainer = styled.TouchableOpacity`
    align-items: center;
    margin-top: 20px;
`

const FindPassword = styled.Text`
    color: ${COLORS.gray_400};
    font-size: 14px;
    font-family: Pretendard;
    font-weight: 400;
    line-height: 22.40px;
`