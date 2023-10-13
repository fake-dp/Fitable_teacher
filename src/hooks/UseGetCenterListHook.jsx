import { useEffect,useState } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';


function UseGetCenterListHook(props) {

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [shouldFetch, setShouldFetch] = useState(true);

    useEffect(() => {
        getCenterListData();
    },[centerList])

    const getCenterListData = async () => {
        if (shouldFetch) {
            const response = await getCenterList();
            setCenterList(response);
            setCenterId(response[0].id);
            setShouldFetch(false);
        }else{
            return;
        }
    }

}

export default UseGetCenterListHook;