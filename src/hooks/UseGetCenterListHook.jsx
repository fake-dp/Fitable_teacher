import { useEffect,useState,useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { getCenterList } from '../api/trainersApi';
import {centerIdState,centerListState} from '../store/atom';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function UseGetCenterListHook(props) {

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [centerList, setCenterList] = useRecoilState(centerListState);

    // console.log('hookes@@@@@@@@@@@@@',centerId,centerList)
    useFocusEffect(
        useCallback(() => {
                getCenterListData();
        },[centerId]));

    
    // useEffect(() => {
    //     getCenterListData();
    // },[centerList])


    useEffect(() => {
        if (centerList.length === 0) {
            setCenterId(null);
        } else if(centerList.length ===1){
            setCenterId(centerList[0].id);
        }
    }
    , [centerList]);

    // useEffect(() => {
    //     if(centerId === null && centerList.length > 0) {
    //         setCenterId(centerList[0].id);
    //     }
    // }, [centerList,centerId]);

        const getCenterListData = async () => {
                try{
                    const response = await getCenterList();
                    // console.log('응답데이터확인헤더@@@',response)

                        if(response){
                            setCenterList(response);
                        //     setCenterId(response[0].id);
                        //         // 이미 선택된 센터가 새로운 리스트에 포함되어 있는지 확인
                        //     const selectedCenterExists = response.some(center => center.id === centerId);
            
                        //  // 선택된 센터가 새로운 리스트에 없을 경우 첫 번째 센터를 선택
                        // if (!selectedCenterExists) {
                        //     setCenterId(response[0].id);
                        //      }
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
