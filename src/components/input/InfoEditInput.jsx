import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput } from "react-native";
import React, { forwardRef } from 'react';

export const InfoEditInput = forwardRef(({
    onSubmitEditing, value, onChangeText, placeholder, onBlur, title, hasError, maxLength
  }, ref) => { // ref는 여기에 정확하게 위치합니다.
    const isNameInput = title === '이름';
  
    return (
      <>
        <InfoTitleText>{title}</InfoTitleText>
        <InfoTextInputContainer hasError={hasError}>
          <InfoTextInput
            ref={ref} // ref를 이렇게 연결합니다.
            maxLength={maxLength}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={!isNameInput}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="done"
          />
        </InfoTextInputContainer>
      </>
    );
  });
  


const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22.40px;
 margin-bottom: 8px;
 margin-top: 28px;
`;


const InfoTextInputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${COLORS.gray_100};
    border-radius: 15px;
    padding: 0 20px;
    border-width: ${props => props.hasError ? '1px' : '0px'};
   border-color: ${props => props.hasError ? 'red' : 'transparent'};
    ${props => props.isPasswordInput && `
   
    `}
`;

const InfoTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
}))`
    flex: 1;
    color: ${COLORS.sub};
    font-size: 15px;
    font-weight: 500;
    line-height: 22.40px;
    font-family: 'Pretendard-Regular';
`;