import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import FastImage from 'react-native-fast-image';
function GobackGrid({children, onPress}) {
    
const backArrow = require('../../assets/img/back_black.png');
    return (
        <GobackTouchable onPress={onPress}>
            <FastImage source={backArrow}
                style={{width: 24, height: 20}}
            />
            <TitleText>{children}</TitleText>
        </GobackTouchable>
    );
}

export default GobackGrid;

const GobackTouchable = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
margin-bottom: 44px;
`;

const TitleText = styled.Text`
color: ${COLORS.sub};
font-size: 20px;
font-weight: 600;
margin-left: 12px;
`
