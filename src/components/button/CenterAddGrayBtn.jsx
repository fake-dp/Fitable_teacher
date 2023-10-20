import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 


function CenterAddGrayBtn({children, onPress}) {

    const addbtn = require('../../assets/addbtngray.png');

    return (
        <AddBtnContainer onPress={onPress}>
        <AddbtnBox>
            <AddbtnIcon source={addbtn}/>
            <AddBtnText>{children}</AddBtnText>
        </AddbtnBox>
    </AddBtnContainer>
    );
}

export default CenterAddGrayBtn;



const AddBtnContainer = styled.TouchableOpacity`
background-color: ${COLORS.white};
border : 1px solid ${COLORS.gray_200};
border-radius: 13px;
padding: 14px 16px;
margin-bottom: 22px;
`;

const AddbtnBox = styled.View`
flex-direction: row;
align-items: center;
justify-content: center;
`

const AddbtnIcon = styled.Image`
    margin-right: 8px;
`

const AddBtnText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`