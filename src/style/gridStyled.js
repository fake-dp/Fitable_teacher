import styled from 'styled-components/native';
import {COLORS} from '../constants/color';

export const LoginContainer = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
    align-items: center;
    justify-content: center;
`;

export const MainContainer = styled.View`
    flex:1;
    padding: 0 20px;
    background-color: ${COLORS.white};
`

export const ErrorText = styled.Text`
    color: #E11616;
    font-size: 12px;
    font-weight: 400;
    line-height: 16.80px;
    padding-left: 12px;
`;