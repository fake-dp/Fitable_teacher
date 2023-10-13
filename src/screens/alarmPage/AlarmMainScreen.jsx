import {MainContainer} from '../../style/gridStyled'
import CenterListHeaderGrid from '../../components/grid/CenterListHeaderGrid';
import AlarmTwoBtnGrid from '../../components/grid/AlarmTwoBtnGrid';
import { useEffect, useState } from 'react';
import { getCenterList } from '../../api/trainersApi';
import { useRecoilState } from 'recoil';
import {centerIdState} from '../../store/atom';

function AlarmMainScreen(props) {

    const [centerList, setCenterList] = useState([]);
    const [shouldFetch, setShouldFetch] = useState(true);
    const [centerId, setCenterId] = useRecoilState(centerIdState);

    const getCenterListData = async () => {
        if (shouldFetch) {
            const response = await getCenterList();
            setCenterList(response);
            setCenterId(response[0].id);
            setShouldFetch(false);
        }
    }

    useEffect(() => {
        getCenterListData();
    },[centerList])

    // console.log('centerIdcenterIdcenterId',centerId)

    return (
    <MainContainer>
        <CenterListHeaderGrid centerList={centerList}/>
        <AlarmTwoBtnGrid />
    </MainContainer>
    );
}

export default AlarmMainScreen;

