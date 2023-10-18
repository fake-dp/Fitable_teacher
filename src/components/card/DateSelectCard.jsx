import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import {formatDate} from '../../utils/CustomUtils'
function DateSelectCard({children, imgIcon, state ,onPress}) {

    const {startDate="",endDate=""}=state ||{};
    const rightIcon = require('../../assets/colsdowngray.png');

    return (
        <Container>
        <LabelText>{children}</LabelText>
        <SelectBoxGrid>
        <SelectBox>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                }
            <SelectBoxText>{formatDate(startDate)}</SelectBoxText>
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
            
         <SelectBox>
            <SelectInnerBox>
                {
                    imgIcon && imgIcon && (<LeftIcon source={imgIcon}/>)
                }
            <SelectBoxText>{formatDate(endDate)}</SelectBoxText>
            </SelectInnerBox>
            <RigthIcon source={rightIcon}/>
         </SelectBox>
         </SelectBoxGrid>
    </Container>
    );
}

export default DateSelectCard;



         


const Container = styled.View`
margin-top: 10px;
margin-bottom: 20px;
`

const SelectBoxGrid = styled.View`
display: flex;
flex-direction: row;
align-items: center; 
justify-content: space-between;
width: 100%;
`

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_200};
    border-radius: 13px;
    padding: 15px 16px;
    width: 49%;
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
margin-right:5px
`