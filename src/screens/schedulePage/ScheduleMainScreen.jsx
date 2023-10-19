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
import { floatingState,centerIdState } from '../../store/atom';
import {getLessonAvailable} from '../../api/lessonApi';
import LessonListGrid from '../../components/grid/LessonListGrid';
function ScheduleMainScreen(props) {

    const navigation = useNavigation();

    const [openFloatingModal, setOpenFloatingModal] = useRecoilState(floatingState);
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [isAvailable, setIsAvailable] = useState(false);
    const toggleFloatingModal = () =>{
        setOpenFloatingModal(!openFloatingModal);
        console.log('openFloatingModalopenFloatingModal',openFloatingModal)
    }


    const getLessonAvailableData = async () => {
        const response = await getLessonAvailable(centerId);
        setIsAvailable(response);
    }


    useEffect(() => {
        if(centerId){
        getLessonAvailableData()
        }
    },[centerId])

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
      

      console.log('centerId',centerId)

    return (
    <>
        <Container>
            <HeaderContainer>
                <CenterListHeaderGrid />
            </HeaderContainer>
                <CustomCalendar/>
            
            {/* lessonList */}
          {/* <LessonListGrid lessonList={lessonList}/> */}
    </Container>
    {
        isAvailable && isAvailable && (
            <FloatingBtn onPress={toggleFloatingModal} isOpen={openFloatingModal}/>
        )
    }
    {openFloatingModal && <FloatingModal/>}
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



