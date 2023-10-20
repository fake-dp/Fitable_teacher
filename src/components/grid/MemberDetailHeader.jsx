import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import GobackWhiteGrid from '../../components/grid/GobackWhiteGrid';
import { useNavigation } from '@react-navigation/native';
import {formatPhoneNumber} from '../../utils/CustomUtils';

function MemberDetailHeader({detailData}) {

    const navigation = useNavigation();


    const goBack = () => {
        navigation.goBack();
    }

    const sendMsg = require('../../assets/emailIcon.png');
    const call = require('../../assets/phoneIcon.png');

    return (
        <HeaderContainer>
        <GobackWhiteGrid onPress={goBack}>회원 정보</GobackWhiteGrid>
        <MainHeaderContainer>
            <MainLeftHeaderContainer>
                   <MainHeaderTitleText>{detailData.member.name}</MainHeaderTitleText>
                 <LeftInfoContainer>
                   <MainHeaderPhoneTitleText>{formatPhoneNumber(detailData.member.phone)} </MainHeaderPhoneTitleText>
                   {detailData.member.generation && <MainHeaderPhoneTitleText>• {detailData.member.generation}대</MainHeaderPhoneTitleText>}
                 </LeftInfoContainer>
            </MainLeftHeaderContainer>
            
            <RightInfoContainer>
                <IconWrapper>
                    <InfoIcon source={sendMsg}/>
                </IconWrapper>
                <IconWrapper>
                    <InfoIcon source={call}/>
                </IconWrapper>
            </RightInfoContainer>
        </MainHeaderContainer>
    </HeaderContainer>
    );
}

export default MemberDetailHeader;


const HeaderContainer = styled.View`
    width: 100%;
    height: 160px;
    background-color: ${COLORS.sub};
    padding: 0 20px;
`;

const MainHeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const MainLeftHeaderContainer = styled.View`
    flex-direction: column;
`

const LeftInfoContainer = styled.View`
    flex-direction: row;
`

const MainHeaderTitleText = styled.Text`
    font-size: 24px;
    font-weight: 700;
    line-height: 32.40px;
    color: ${COLORS.white};
`;

const MainHeaderPhoneTitleText = styled.Text`
    font-size: 14px;
    font-weight: 500;
    line-height: 22.40px;
    color: ${COLORS.gray_200};
`;

const RightInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;


const IconWrapper = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background-color: ${COLORS.box};
    justify-content: center;
    align-items: center;
    margin-left: 13px;
`;

const InfoIcon = styled.Image`
`;
