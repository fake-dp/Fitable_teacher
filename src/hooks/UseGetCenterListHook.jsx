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
    },[shouldFetch])

    const getCenterListData = async () => {
        if (shouldFetch) {
            try{
                const response = await getCenterList();
                console.log('응답데이터확인헤더',response)
                if(response&&response){
                    setCenterList(response);
                    setCenterId(response[0].id);
                }
            }catch(error){
                console.log('@@@@',error)
            }
            setShouldFetch(false);
    }
   }
}

export default UseGetCenterListHook;