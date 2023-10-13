import {MainContainer} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import AlarmTwoBtn from '../../components/button/AlarmTwoBtn';

function AlarmMainScreen(props) {

    return (
    <MainContainer>
        <CenterListHeaderGrid />
        <AlarmTwoBtn />
    </MainContainer>
    );
}

export default AlarmMainScreen;

