import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {GridLine} from '../../style/gridStyled'
import CustomCalendar from '../../components/custom/CustomCalender';
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import FloatingBtn from '../../components/button/FloatingBtn';
import { useState, useEffect } from 'react';
import FloatingModal from '../../components/modal/FloatingModal';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { floatingState } from '../../store/atom';
function ScheduleMainScreen(props) {

    const navigation = useNavigation();

    const [openFloatingModal, setOpenFloatingModal] = useRecoilState(floatingState);

    const toggleFloatingModal = () =>{
        setOpenFloatingModal(!openFloatingModal);
        console.log('openFloatingModalopenFloatingModal',openFloatingModal)
    }

    useEffect(() => {
        if (openFloatingModal) {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          });
        } else {
          navigation.setOptions({
            headerStyle: {
              backgroundColor: COLORS.white,
            },
          });
        }
      }, [openFloatingModal]);
      

    return (
    <>
        <Container>
            <HeaderContainer>
                <CenterListHeaderGrid />
            </HeaderContainer>
                <CustomCalendar />
            <HeaderContainer>
                <GridLine/>
            </HeaderContainer>
    </Container>
        <FloatingBtn onPress={toggleFloatingModal} isOpen={openFloatingModal}/>
             {openFloatingModal && 
        <FloatingModal/>
    }
    </>
    );
}

export default ScheduleMainScreen;

const Container = styled.View`
   flex:1;
    background-color: ${COLORS.white};
`
    

const HeaderContainer = styled.View`
    padding:0 20px;
`



