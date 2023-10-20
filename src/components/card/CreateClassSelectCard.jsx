import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import {formatDate} from '../../utils/CustomUtils'
function CreateClassSelectCard({children, imgIcon, state ,onPress}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/colsdowngray.png');

    return (
        <Container>
            <LabelText>{children}</LabelText>
            <SelectBox>
                <SelectInnerBox>
                    {
                        imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                    }
                    {
                        children === '날짜' ? (<SelectBoxText>{formatDate(state)}</SelectBoxText>) : (<SelectBoxText>{state}</SelectBoxText>)
                    }
                </SelectInnerBox>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
        </Container>
    );
}

export default CreateClassSelectCard;


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
`

const SelectInnerBox = styled.View`
flex-direction: row;
align-items: center;
`

const SelectBoxText = styled.Text`
font-size: 14px;
color: ${COLORS.gray_300};
font-weight: 400;
line-height: 22.40px;
`

const LabelText = styled.Text`
font-size: 14px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.gray_400};
margin-bottom: 12px;
`

const RigthIcon = styled.Image``

const LeftIcon = styled.Image`
margin-right:11px
`