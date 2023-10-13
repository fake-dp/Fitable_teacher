import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { GridLineOne } from '../../style/gridStyled';
function AlarmDetailConsultGrid({ consultDetail }) {
    console.log('consultDetail:', consultDetail);

    const nextIcon = require('../../assets/rightIcon.png');

    return (
        <Container>
            <ContentsContainer>
                <TitleText>상담 신청</TitleText>
                <ContentText>{consultDetail.caution}</ContentText>
            </ContentsContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>요청 날짜</TitleText>
                <ContentText>{consultDetail.createAt}</ContentText>
            </ContentsContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>희망 시간</TitleText>
                <ContentText>{consultDetail.time.join(', ')}</ContentText>
            </ContentsContainer>

            <GridLineOne />

            <ContentsContainer>
                <TitleText>운동 목적</TitleText>
                <ContentText>{consultDetail.purpose.join(', ')}</ContentText>
            </ContentsContainer>

            <GridLineOne />

                    <TitleText>회원정보</TitleText>
            <BtnContainer>

                <BtnGridBox>
                    <TitleText>{consultDetail.trainerName}</TitleText>
                    <ContentText>{consultDetail.memberInfo.phone} • {consultDetail.memberInfo.generation}대</ContentText>
                </BtnGridBox>
                <BtnNextIcon source={nextIcon} />

            </BtnContainer>
        </Container>
    );
}

export default AlarmDetailConsultGrid;

const Container = styled.View`
`;

const ContentsContainer = styled.View`
`;


const TitleText = styled.Text`
    font-size: 16px;
color: ${COLORS.sub};
font-weight: 600;
line-height: 22.40px;
margin-bottom: 8px;
`;

const ContentText = styled.Text`
  font-size: 14px;
color: ${COLORS.gray_400};
font-weight: 400;
line-height: 22.40px;
`;

const BtnContainer = styled.TouchableOpacity`
margin-top: 16px;
    background-color: ${COLORS.gray_100};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 13px;
    padding: 16px;
    `
const BtnGridBox = styled.View``
const BtnNextIcon = styled.Image`
    width: 20px;
    height: 20px;
`;