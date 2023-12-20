import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useState } from 'react';

function MemberSearch(props) {

    const search = require('../../assets/img/searchicon.png');

    return (
        <SearchContainer>
         <ImageIcon source={search}/>
             <TextInput
                 style={{marginLeft: 10, fontSize: 16, color: COLORS.sub}}
                 placeholder="회원 이름 또는 전화번호 4자리"
                 placeholderTextColor={COLORS.gray_300}
                //  onFocus={handleTextInputFocus}
                //  onBlur={handleTextInputBlur}
                //  onChangeText={handleSearchQueryChange}
                //  onSubmitEditing={handleSearch}
                 returnKeyType="done"
              />
        </SearchContainer>
    );
}

export default MemberSearch;


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