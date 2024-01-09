import { useEffect,useState,useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';
import { useFocusEffect } from '@react-navigation/native';

function UseGetCenterListHook(props) {

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);

    // console.log('hookes@@@@@@@@@@@@@',centerId,centerList)
    // useFocusEffect(
    //     useCallback(() => {
    //             getCenterListData();
    //     },[centerId]));

    
    useEffect(() => {
        getCenterListData();
    },[])

    // useEffect(() => {
    //     if(centerId === null && centerList.length > 0) {
    //         setCenterId(centerList[0].id);
    //     }
    // }, [centerList,centerId]);

        const getCenterListData = async () => {
                try{
                    const response = await getCenterList();
                    console.log('응답데이터확인헤더@@@',response)

                        if(response && response.length > 0){
                            setCenterList(response);
                            // setCenterId(response[0].id);
                                // 이미 선택된 센터가 새로운 리스트에 포함되어 있는지 확인
            const selectedCenterExists = response.some(center => center.id === centerId);
            
            // 선택된 센터가 새로운 리스트에 없을 경우 첫 번째 센터를 선택
            if (!selectedCenterExists) {
                setCenterId(response[0].id);
            }
                        } else {
                            setCenterList([]);
                            setCenterId(null);
                        }
                }catch(error){
                    console.log('@@@@',error)
                    if(error.code === 10300) {
                        console.log('센터를 찾지 못했습니다.');
                    }
            }
        }
        
    }        

export default UseGetCenterListHook;


// const getCenterListData = async () => {
//     if (shouldFetch) {
//         try{
//             const response = await getCenterList();
//             console.log('응답데이터확인헤더',response)
//             if(centerId) { // centerId가 유효한지 확인
//                 if(response && response.length > 0){
//                     setCenterList(response);
//                     setCenterId(response[0].id);
//                 } else {
//                     setCenterList([]);
//                     setCenterId(null);
//                 }
//             }
//         }catch(error){
//             console.log('@@@@',error)
//             setShouldFetch(false);
//             if(error.code === 10300) {
//                 console.log('센터를 찾지 못했습니다.');
//             }
//         }
//     }
// }

// }    