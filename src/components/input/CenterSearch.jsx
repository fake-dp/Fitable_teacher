import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useState } from 'react';

function CenterSearch(props) {
    return (
        <SearchContainer>
        <ImageIcon source={search}/>
        <TextInput
        style={{marginLeft: 10, fontSize: 16, color: COLORS.white}}
        placeholder="센터를 입력해주세요"
        placeholderTextColor={COLORS.gray_200}
        onFocus={handleTextInputFocus}
        onBlur={handleTextInputBlur}
        onChangeText={handleSearchQueryChange}
        onSubmitEditing={handleSearch}
        returnKeyType="done"
        />
        </SearchContainer>
    );
}

export default CenterSearch;


const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    background-color: ${COLORS.box};
    height: 50px;
    border-radius: 13px;
    margin-bottom: 28px;
`

const ImageIcon = styled.Image`
    margin-left: 16px;
`