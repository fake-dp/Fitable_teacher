import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";
import { TextInput, Image } from "react-native";
import { useRef } from 'react';

function MemberSearch({onChange,searchText}) {

    const search = require('../../assets/img/searchicon.png');
    const inputRef = useRef(null);

    const handlePress = () => {
      // TextInput에 포커스를 줌
      inputRef.current.focus();
    };
    return (
        <SearchContainer onPress={handlePress}>
         <ImageIcon source={search}/>
             <TextInput
                ref={inputRef} 
                 style={{marginLeft: 10, fontSize: 16, color: COLORS.sub}}
                 value={searchText}
                 placeholder="회원 이름 또는 전화번호 4자리"
                 placeholderTextColor={COLORS.gray_300}
                 returnKeyType="done"
                 onChangeText={onChange}
              />
        </SearchContainer>
    );
}

export default MemberSearch;


const SearchContainer = styled.TouchableOpacity`
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