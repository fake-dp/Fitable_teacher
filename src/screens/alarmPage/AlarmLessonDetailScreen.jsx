import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import AlarmDetailLessonCommonGrid from '../../components/grid/DetailLessonCommonGrid';

function AlarmLessonDetailScreen(props) {

    const route = useRoute();
    const { lessonDetail } = route.params;
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    console.log('수업 디테일',lessonDetail)
    return (
        <MainContainer>
             <GobackGrid onPress={goBack}/>
             <AlarmDetailLessonCommonGrid lessonDetail={lessonDetail}/>
        </MainContainer>
    );
}

export default AlarmLessonDetailScreen;