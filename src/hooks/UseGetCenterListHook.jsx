import { useEffect,useState,useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';
import { useFocusEffect } from '@react-navigation/native';

function UseGetCenterListHook(props) {

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [shouldFetch, setShouldFetch] = useState(true);


    useFocusEffect(
        useCallback(() => {
            getCenterListData();
        },[centerId]));

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