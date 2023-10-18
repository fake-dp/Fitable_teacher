import React, { useState } from 'react';
import CheckRadioBtn from '../button/CheckRadioBtn';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';

function CheckBtnGrid({selectedCheckBox, setSelectedCheckBox}) {

    console.log('체크박스 선택',selectedCheckBox)
    return (
    <CheckRadiobtnWrapper>
        <CheckRadioBtnContainer>
           <CheckRadioBtn 
               isChecked={selectedCheckBox === 'SINGLE'} 
               setIsChecked={() => setSelectedCheckBox('SINGLE')}
               >일회성</CheckRadioBtn>
         </CheckRadioBtnContainer>

           <CheckRadioBtn 
               isChecked={selectedCheckBox === 'MULTIPLE'} 
               setIsChecked={() => setSelectedCheckBox('MULTIPLE')}
           >반복</CheckRadioBtn>
    </CheckRadiobtnWrapper>
    );
}

export default CheckBtnGrid;

const CheckRadiobtnWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 30px;
`

const CheckRadioBtnContainer = styled.View`
    margin-right: 20px;
`