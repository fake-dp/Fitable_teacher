import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color';

function DaySelectBtnGrid(props) {
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const [selectedDays, setSelectedDays] = useState(Array(7).fill(false));

    const toggleDay = (index) => {
        const newSelectedDays = [...selectedDays];
        newSelectedDays[index] = !newSelectedDays[index];
        setSelectedDays(newSelectedDays);
    };

    console.log('selectedDays',selectedDays)

    return (
        <DaysContainer>
            {days.map((day, index) => (
                <DayButton 
                    key={index} 
                    selected={selectedDays[index]}
                    onPress={() => toggleDay(index)}
                >
                    <DayText selected={selectedDays[index]}>{day}</DayText>
                </DayButton>
            ))}
        </DaysContainer>
    );
}

export default DaySelectBtnGrid;

const DaysContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`;

const DayButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.selected ? COLORS.sub : COLORS.gray_200};
    background-color: ${props => props.selected ? COLORS.sub : COLORS.white};
`;

const DayText = styled.Text`
    color: ${props => props.selected ? COLORS.white : COLORS.gray_300};
    font-weight: bold;
`;
