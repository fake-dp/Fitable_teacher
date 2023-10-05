import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/color";

function CertifiactionBtn({children, onPress, isActive}) {
    return (
        <GetCertificationNextBtn
        onPress={onPress}
        >
            <GetCertificationNextText>{children}</GetCertificationNextText>
        </GetCertificationNextBtn>
    );
}

export default CertifiactionBtn;

// const GetCertificationNextBtn = styled.TouchableOpacity`
//     position: absolute;
//     bottom: 40px;
//     left: 10px;
//     right: 10px;
//     /* background-color: ${COLORS.box}; */
//     background-color: ${props => props.isActive ? COLORS.main : COLORS.box};
//     border-radius: 90px;
//     align-items: center;
//     justify-content: center;
//     padding: 14px 0;
// `;

// const GetCertificationNextText = styled.Text`
// font-size: 16px;
// font-weight: 600;
// line-height: 22.40px;
// /* color: ${COLORS.gray_300}; */
// color: ${props => props.isActive ? '#000000' : COLORS.white};
// `
const GetCertificationNextBtn = styled.TouchableOpacity`
    position: absolute;
    bottom: 40px;
    left: 10px;
    right: 10px;
    background-color: ${COLORS.gray_100};
    /* background-color: ${COLORS.sub}; */
    border-radius: 90px;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
`;

const GetCertificationNextText = styled.Text`
font-size: 16px;
font-weight: 600;
line-height: 22.40px;
color: ${COLORS.gray_300};
/* color: ${COLORS.white}; */
`