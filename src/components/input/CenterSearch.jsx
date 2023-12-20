import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useState } from 'react';

function CenterSearch({onFocus, onBlur, onChangeText, onSubmitEditing}) {

    const search = require('../../assets/img/searchicon.png');

    return (
        <SearchContainer>
        <ImageIcon source={search}/>
        <TextInput
        style={{marginLeft: 10, fontSize: 16, color: COLORS.sub}}
        placeholder="센터 검색"
        placeholderTextColor={COLORS.gray_300}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="done"
        />
        </SearchContainer>
    );
}

export default CenterSearch;


const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    background-color: ${COLORS.gray_100};
    height: 50px;
    border-radius: 13px;
    margin-bottom: 16px;
`

const ImageIcon = styled.Image`
    margin-left: 16px;
`