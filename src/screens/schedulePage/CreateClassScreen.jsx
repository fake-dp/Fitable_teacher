import styled from 'styled-components/native';
import {COLORS} from '../../constants/color'
import {MainContainer} from '../../style/gridStyled'
import MainLongTextGrid from '../../components/grid/MainLongTextGrid';
import GobackGrid from '../../components/grid/GobackGrid';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

function CreateClassScreen(props) {

    const route = useRoute();
    const { type } = route.params;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}/>
            {
                type === 'group' ? (
                    <MainLongTextGrid>그룹 수업을</MainLongTextGrid>
                ):(
                    <MainLongTextGrid>1:1수업 일정을</MainLongTextGrid>
                )
            }
            <MainLongTextGrid>만들어주세요</MainLongTextGrid>
        </MainContainer>
    );
}

export default CreateClassScreen;