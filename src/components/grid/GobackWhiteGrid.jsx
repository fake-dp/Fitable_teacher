import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import {Image } from 'react-native';

function GobackWhiteGrid({children, onPress}) {
    
const whiteArrow = require('../../assets/back_white.png');
    return (
        <GobackTouchable onPress={onPress}>
            <Image source={whiteArrow}/>
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackWhiteGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
margin-bottom: 44px;
`;

const TitleText = styled.Text`
color: ${COLORS.white};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
