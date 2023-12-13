// UI-loinput
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useState } from 'react';
function AuthInput({value, onChangeText, placeholder,maxLength,onSubmitEditing}) {

    const [showPassword, setShowPassword] = useState(false);
    const isPasswordInput = placeholder === '비밀번호';

    const handlePasswordVisibilityChange = () => {
        setShowPassword(!showPassword);
        };

    return (
       <>
        {
            isPasswordInput ? (
                <AuthTextInputContainer
                isPasswordInput={isPasswordInput}
                >
           
           {value.length > 0 && (
            <TogglePasswordVisibility onPress={handlePasswordVisibilityChange}>
              <Image source={showPassword ? require('../../assets/t_eye_open.png') : require('../../assets/t_eye_closed.png')} />
            </TogglePasswordVisibility>
          )}
                <AuthTextInput
                  value={value}
                  onChangeText={onChangeText}
                  placeholder={placeholder}
                  secureTextEntry={!showPassword}
                  onSubmitEditing={onSubmitEditing}
                />
                </AuthTextInputContainer>   
            ):(
                <AuthTextInputContainer>
                <AuthTextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={maxLength}
                keyboardType="numeric"
                />
                </AuthTextInputContainer>
            )
        }
       </>
   
    );
}

export default AuthInput;

const TogglePasswordVisibility = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const AuthTextInputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${COLORS.gray_100};
    border-radius: 15px;
    margin-bottom: 8px;
    padding: 0 20px;
    ${props => props.isPasswordInput && `
   
    `}
`;

const AuthTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.sub};
    font-size: 16px;
    font-weight: 500;
    line-height: 22.40px;
    font-family: 'Pretendard-Regular';
`;
