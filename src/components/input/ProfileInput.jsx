import { COLORS } from "../../constants/color";
import { TextInput } from "react-native";
import styled from 'styled-components/native';
import { useState } from "react";
function ProfileInput({value, onChangeText, placeholder,title,maxLength}) {

    const [inputHeight, setInputHeight] = useState(60); // 기본 높이 설정

    const handleContentSizeChange = (event) => {
     
            setInputHeight(event.nativeEvent.contentSize.height + 30);
        
    };


    return (
        <>
        <InfoTitleText>{title}</InfoTitleText>
        <InfoTextInputContainer  style={{ height: Math.max(60, inputHeight) }}>
            <InfoTextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={true}
                onContentSizeChange={handleContentSizeChange}
                // onSelectionChange={handleSelectionChange}
                scrollEnabled={false}
                maxLength={maxLength}
                style={{ height: Math.max(60, inputHeight) }}
                  />
        </InfoTextInputContainer>
        </>
    );
}

export default ProfileInput;

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22.40px;
 margin-bottom: 8px;
 margin-top: 40px;
`;


const InfoTextInputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${COLORS.white};
    border-radius: 15px;
    padding: 10px 20px;
    border-width: 1px;
    border-color: ${COLORS.gray_200};
`;

const InfoTextInput = styled(TextInput).attrs(() => ({
    placeholderTextColor: COLORS.gray_300,
    textAlignVertical: 'top',
}))`
    flex: 1;
    margin: 0;
    color: ${COLORS.sub};
    font-size: 15px;
    font-weight: 500;
    line-height: 22.40px;
    font-family: 'Pretendard-Regular';
`;