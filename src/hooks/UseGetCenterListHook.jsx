import { useEffect,useState,useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function UseGetCenterListHook(props) {

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);
    console.log('centerList',centerList)

    useEffect(() => {
        const fetchCenterList = async () => {
            const response = await getCenterList(); // 센터 리스트 API 호출
            console.log('responseresponseresponse',response)
            setCenterList(response); // Recoil 상태 업데이트
            const storedCenterId = await AsyncStorage.getItem('centerId'); // 저장된 센터 ID 불러오기
            console.log('storedCenterId',storedCenterId)
            if (storedCenterId && response.some(center => center.id === storedCenterId)) {
                setCenterId(storedCenterId); // 저장된 센터 ID가 유효하면 선택
            } 
        };

        fetchCenterList();
    }, []);
}
    // console.log('hookes@@@@@@@@@@@@@',centerId)
    // useFocusEffect(
    //     useCallback(() => {
    //             getCenterListData();
    //     },[centerId]));



    // useEffect(() => {
    //     if (centerList.length === 0) {
    //         setCenterId(null);
    //     } else if(centerList.length ===1){
    //         setCenterId(centerList[0].id);
    //     }
    // }
    // , [centerList]);



    //     const getCenterListData = async () => {
    //             try{
    //                 const response = await getCenterList();

    //                     if(response){
    //                         setCenterList(response);
    //                     } 
    //                      }catch(error){
    //                              console.log('@@@@',error)
    //                         if(error.code === 10300) {
    //                     console.log('센터를 찾지 못했습니다.');
    //                 }
    //         }
    //     }
        
    // }        

export default UseGetCenterListHook;
