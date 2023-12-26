import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState ,useCallback} from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { Text } from 'react-native';
import GobackGrid from '../../components/grid/GobackGrid';
import ImagePicker from 'react-native-image-crop-picker';
import {getTrainersProfileInfo} from '../../api/mypageApi';
import TrainerInfoListGrid from '../../components/grid/TrainerInfoListGrid';
import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import TrainerInfoGetListGrid from '../../components/grid/TrainerInfoGetListGrid';
import { useFocusEffect } from '@react-navigation/native';

function EditProfileScreen(props) {
    const [selectedImages, setSelectedImages] = useState([]); 
    const navigation = useNavigation();
    const [profileInfo, setProfileInfo] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const getProfileInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                setProfileInfo(response);
                console.log('response',response.isExistProfile);
            }else{
                console.log('ddd')
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
        }
    }


    useFocusEffect(
        useCallback(() => {
            getProfileInfo();
        },[]));
    // {
    // "career": null, 
    // "centerProfiles": null, 
    // "description": null, 
    // "images": null, 
    // "isExistProfile": false, 
    // "lessonItems": null, 
    // "qualifications": null
    // }
    console.log('profileInfoisEditMode',profileInfo,isEditMode)

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <HeaderGrid>
            <GobackGrid onPress={goBack}>프로필 관리</GobackGrid>
            {
                profileInfo.isExistProfile && !isEditMode &&
            <EditContainerBtn onPress={() => setIsEditMode(true)}>
                <EditBtnText>수정</EditBtnText>
            </EditContainerBtn>
            }
            </HeaderGrid>
            {
                !isEditMode && profileInfo.isExistProfile ?
                <TrainerInfoGetListGrid profileInfo={profileInfo}/> :
                <TrainerInfoListGrid profileInfo={profileInfo} isEditMode={isEditMode} setIsEditMode={setIsEditMode}/> 
            }
        </MainContainer>
    );
}

export default EditProfileScreen;

const HeaderGrid = styled.View`
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
    margin-bottom: 20px;
`

const EditContainerBtn = styled.TouchableOpacity`

`

const EditBtnText = styled.Text``