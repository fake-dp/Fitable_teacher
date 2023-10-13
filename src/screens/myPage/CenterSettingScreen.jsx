import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
function CenterSettingScreen(props) {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>연동센터 설정</GobackGrid>
        </MainContainer>
    );
}

export default CenterSettingScreen;