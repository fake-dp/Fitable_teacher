import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import ImagePicker from 'react-native-image-crop-picker';
import React,{ useState,useEffect } from 'react';
import { Alert,TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import ProfileInput from '../input/ProfileInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CenterAddGrayBtn from '../button/CenterAddGrayBtn';
import BasicMainBtn from '../button/BasicMainBtn';
import ProfileTextArea from '../input/ProfileTextArea';
import CenterListSlideModal from '../modal/CenterListSlideModal';
import UseGetCenterListHook from '../../hooks/UseGetCenterListHook';
import { useRecoilState } from 'recoil';
import { centerListState,profileState } from '../../store/atom';
import ProfileSelectDateCard from '../card/ProfileSelectDateCard';
import DateSelectCard from '../card/DateSelectCard';
import TimeSelectCard from '../card/TimeSelectCard';
import { useFocusEffect } from '@react-navigation/native';
import {deleteTrainersProfileInfo,setTrainersProfileInfo,updateTrainersProfileInfo,getTrainersProfileInfo} from '../../api/mypageApi';
import DeleteProfileModal from '../modal/DeleteProfileModal';
import { useNavigation } from '@react-navigation/native';
import ProfileSettingBtn from '../button/ProfileSettingBtn';
import FastImage from 'react-native-fast-image';

function TrainerInfoListGrid({profileInfo,isEditMode,setIsEditMode, setProfileInfo, setIsExistProfile}) {
    // UseGetCenterListHook();

    const navigation = useNavigation();
    const [isClicking, setIsClicking] = useState(false);
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [selectedCenter, setSelectedCenter] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteProfileModal, setDeleteProfileModal] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]); 
    const [updateSelectedImages, setUpdateSelectedImages] = useState(profileInfo?.images);
    const [updateSelectImages, setUpdateSelectImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);
    console.log('updateSelectedImages@!@#!@#!@#!@#!@#@',updateSelectImages)
    const openImagePicker = () => {
    ImagePicker.openPicker({
        multiple: true, 
        maxFiles:isEditMode ? 10-updateSelectedImages.length:10 - selectedImages.length, 
        width: 300,
        height: 400,
        cropping: true,
      })
      .then(newImages => {
        console.log('@@@@@@@@@@@@@@@@@@@이미지',newImages);
      //   setSelectedImages(images.map(image => image.path));
      const newPaths = newImages.map(image => ({ id:null, path: image.path }));
      if(isEditMode){
            setUpdateSelectedImages([...updateSelectedImages, ...newPaths].reverse());
            setUpdateSelectImages([...updateSelectImages, ...newImages].reverse());
        }else{
            setSelectedImages([...selectedImages, ...newImages.map(image => image.path)].reverse());
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
console.log('updateSelectedImagesupdateSelectedImages',deleteImages)
    const deleteImage = (indexToDelete) => {
        setSelectedImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
        );
    };


    //t수정삭제
    const updateDeleteImage = (indexToDelete, id) => {
        console.log('index',indexToDelete)
        setUpdateSelectedImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
        );
        setUpdateSelectImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
            )
        if(id){
            console.log('dkid있는경구')
            setDeleteImages([...deleteImages, updateSelectedImages[indexToDelete].id]);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const showCenterListBtn = () => {
        setModalVisible(true);  
    };

    const openDateSelectModal = () => {
        setDeleteProfileModal(true);
    }

    // 프로필 설정 및 수정
    const registerProfileSetting = async () => {
        if (isClicking) {
            return;
          }
            setIsClicking(true);
        try{
            console.log('프로파일 설정!!헤헿',trainerProfile,selectedImages)
            let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
            const formData = new FormData();
            const requestDto = {
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: combinedTimeSettings,
            };
            selectedImages.forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`
                });
            });
            formData.append("requestDto", JSON.stringify(requestDto));
            console.log('formData111123',formData)
            postSettingProfileApi(formData);
    }
    catch(error){
        console.log('error',error)
    }
    finally{
        setIsClicking(false);
    }
}

    const registerProfileUpdate = async () => {
        if (isClicking) {
            return;
          }
            setIsClicking(true);
            try{
                console.log('에디터 모드임')
                let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
                const formData = new FormData();
                const requestDto = {
                    deleteImages:deleteImages,
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: combinedTimeSettings,
            };
            const newPath = updateSelectImages.map(image => image.path);
            newPath.forEach((path, id) => {
                formData.append('images', {
                    uri: path,
                    type: 'image/jpeg',
                    name: `image${id}.jpg`
                });
            });
            formData.append('requestDto', JSON.stringify(requestDto));
            console.log('formData111123',formData)
            updateSettingProfileApi(formData);
            } catch(error){
                console.log('error',error)
            }
            finally{
                setIsClicking(false);
            }
    }

    // getTrainersProfileInfo
    //프로필 설정api
    const postSettingProfileApi = async (formData) => {
        try{
            const response = await setTrainersProfileInfo(formData);
            if(response){
                console.log('response',response);
              Alert.alert("알림","프로필이 설정되었습니다\n 곧 알림이 도착합니다.",
                [{ text: "확인", onPress: () => {
                    getProfileInfo()
                } }]);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
            navigation.navigate('MyProfile')
        }
    }

  
    //프로필 수정api
    const updateSettingProfileApi = async (formData) => {
        console.log('skRKwl 나까지 옴',formData)
        try{
            const response = await updateTrainersProfileInfo(formData);
            if(response){
                console.log('response',response);
                Alert.alert("알림","프로필이 수정되었습니다\n 곧 알림이 도착합니다.",
                [{ text: "확인", onPress: () => {
                    getProfileInfo()
                    setIsEditMode(false)
                } }]);
            }
        }catch(error){
            console.log('updateSettin',error.data)
        }finally{
            console.log('finally')
            navigation.navigate('MyProfile')
        }
    }

    // 다시호출
    const getProfileInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                setProfileInfo(response);
                setIsExistProfile(response.isExistProfile);
                console.log('response',response.isExistProfile);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
        }
    }

    const getProfileDeleteInfo = async () => {
        try{
            const response = await getTrainersProfileInfo();
            if(response){
                // setProfileInfo(response);
                setIsExistProfile(false);
                console.log('response',response.isExistProfile);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
        }
    }


    // 프로필 삭제용
    const deleteProfile = async () => {
console.log('dkdkdk')
        try{
            const response = await deleteTrainersProfileInfo();
            if(response){
                console.log('response',response);
                Alert.alert("알림","프로필이 삭제되었습니다",
                [{ text: "확인", onPress: () => {
                    setSelectedImages([])
                    setSelectedCenter([])
                    setTrainerProfile([])
                    setUpdateSelectedImages([])
                    setDeleteImages([])
                    getProfileDeleteInfo()
                } }]);
            }
        }catch(error){
            console.log('getProfileInfo',error)
        }finally{
            console.log('finally')
            setDeleteProfileModal(false);
            setIsEditMode(false)
            navigation.navigate('MyProfile')
        }
    }

    
    const addCenterListBtn = (id, name) => {
        // 이미 선택된 센터인지 확인
        const isAlreadySelected = selectedCenter.some(center => center.id === id);
    
        if (isAlreadySelected) {
            // 이미 선택된 경우 경고 메시지 표시
            Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
        } else {
            // 새로운 센터와 초기 시간 설정 추가
            const newCenter = {
                id, 
                name,
                timeSettings: [{
                    centerId: id,
                    type: "평일",
                    startTime: "00:00",
                    endTime: "00:00"
                }]
            };
            setSelectedCenter(prevCenters => [...prevCenters, newCenter]);
            setModalVisible(false);
        }
    };

    const handleAddTimeCard = (centerId) => {
        const newTimeSetting = {
            centerId: centerId,
            type: "평일",
            startTime: "00:00",
            endTime: "00:00"
        };
    
        const updatedCenters = selectedCenter.map(center => {
            if (center.id === centerId) {
                // 이미 시간 추가가 되었는지 확인
                if (center.timeCardAdded) {
                    Alert.alert("알림", "시간은 한 번만 추가할 수 있습니다.");
                    return center;
                } else {
                    return {
                        ...center,
                        timeSettings: [...center.timeSettings, newTimeSetting],
                        timeCardAdded: true
                    };
                }
            }
            return center;
        });
    
        setSelectedCenter(updatedCenters);
    };

    const changeType = (centerId, type, index) => {
        console.log('centerId, type, index',centerId, type, index)
        const updatedCenters = selectedCenter.map(center => {
            if (center.id === centerId) {
                return {
                    ...center,
                    timeSettings: center.timeSettings.map((timeSetting, i) => 
                        i === index ? { ...timeSetting, type } : timeSetting
                    ),
                };
            }
            return center;
        });
    
        setSelectedCenter(updatedCenters);
    };
    

    // 상위 컴포넌트
    const changeTime = (centerId, newTime, timeType, index) => {
        const updatedCenters = selectedCenter.map(center => {
          if (center.id === centerId) {
            return {
              ...center,
              timeSettings: center.timeSettings.map((timeSetting, i) =>
                i === index
                  ? { ...timeSetting, [timeType]: newTime }
                  : timeSetting
              ),
            };
          }
          return center;
        });
      
        setSelectedCenter(updatedCenters);
    };
    
    const isEditModefn = isEditMode ? registerProfileUpdate:registerProfileSetting;
    const timeSettingState = 
    selectedCenter[0]?.timeSettings[0]?.startTime !== selectedCenter[0]?.timeSettings[0]?.endTime &&
    selectedCenter[0]?.timeSettings[0]?.startTime < selectedCenter[0]?.timeSettings[0]?.endTime
    const isActivefn = trainerProfile?.career?.length !==0 && trainerProfile?.qualifications?.length !==0 && trainerProfile?.description?.length !==0 && timeSettingState
 
    // console.log('selectedCenter11',trainerProfile.career.length !==0 && trainerProfile.qualifications.length !==0 && trainerProfile.description.length !==0 && timeSettingState,isActivefn)

// console.log('se1',selectedCenter[0]?.timeSettings[0]?.startTime,selectedCenter[0]?.timeSettings[0]?.endTime)
// console.log('se2',selectedCenter[0]?.timeSettings[1]?.startTime,selectedCenter[0]?.timeSettings[1]?.endTime)
// console.log('se3',selectedCenter[1]?.timeSettings[0]?.startTime,selectedCenter[1]?.timeSettings[0]?.endTime)
// console.log('se4',selectedCenter[1]?.timeSettings[1]?.startTime,selectedCenter[1]?.timeSettings[1]?.endTime)
//    console.log('selectedCenter11',selectedCenter[0]?.timeSettings[1].endTime,timeSettingState)
//    console.log('selectedCenter22',selectedCenter[1].timeSettings)
      
    const clockIcon = require('../../assets/img/clockIcon.png');
  
    return (
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            bounces={false}
            extraScrollHeight={80} 
            >
       
            <ProfileTitleText>프로필 사진 등록</ProfileTitleText>
            <ProfileSubTitleText>최대 10장까지 등록 가능합니다</ProfileSubTitleText>  

            <ProfileImgContainer>
  {selectedImages?.length === 10 ? null :
    <ProfileAddBtn onPress={openImagePicker}>
      <ProfileAddImg source={require('../../assets/img/plus_l.png')} />
    </ProfileAddBtn>
  }

  {isEditMode ? (
    updateSelectedImages?.map((image, index) => (
      <SelectImgContainer key={index}>
        <DeleteBtn key={index} onPress={() => updateDeleteImage(index,image.id)}>
          <DeleteImg source={require('../../assets/img/delete.png')} />
        </DeleteBtn>
        <SelectedImage source={{ uri: image.path }} />
      </SelectImgContainer>
    ))
  ) : (
    selectedImages?.length > 0 && (
      <>
        {selectedImages?.map((image, index) => (
          <SelectImgContainer key={index}>
            <DeleteBtn key={index} onPress={() => deleteImage(index)}>
              <DeleteImg source={require('../../assets/img/delete.png')} />
            </DeleteBtn>
            <SelectedImage source={{ uri: image }} />
          </SelectImgContainer>
        ))}
      </>
    )
  )}
</ProfileImgContainer>



            {/* <SelectProfileItemBtn>종목선택</SelectProfileItemBtn> */}
            <CenterInfoContaniner>

            <ProfileCneterTitleText>소개</ProfileCneterTitleText>
                <ProfileTextArea 
                 maxLength={150}
                 isEditMode={isEditMode}
                 profileInfo={profileInfo.description}
                 value={trainerProfile.description}
                 onChangeText={text => setTrainerProfile(prevState => ({
                      ...prevState,
                      description: text
                  }))}
                />
            </CenterInfoContaniner>
            
                <ProfileInput
                title="경력사항"
                placeholder={isEditMode? profileInfo.career:'300자 이하로 작성 가능합니다'}
                // placeholder="300자 이하로 작성 가능합니다"
                maxLength={300}
                value={trainerProfile.career}
                 onChangeText={text => setTrainerProfile(prevState => ({
                     ...prevState,
                 career: text
                 }))}
                />

                <ProfileInput
                title="자격사항"
                placeholder={isEditMode? profileInfo.qualifications:'300자 이하로 작성 가능합니다'}
                // placeholder="300자 이하로 작성 가능합니다"
                maxLength={300}
                value={trainerProfile.qualifications}
                 onChangeText={text => setTrainerProfile(prevState => ({
                     ...prevState,
                     qualifications: text
                 }))}
                />


            <CenterListContaniner>
                {
                    selectedCenter.length === 0 &&<ProfileCneterTitleText>센터별 설정</ProfileCneterTitleText>
                }
             <AddCenterListContaniner>
               {
                    selectedCenter.map((center, index) => (
                        <ListContaniner  key={center.id}>
                        <ProfileCneterTitleText>연동센터{index+1}</ProfileCneterTitleText>
                        <CenterTitleBoxContainer>
                        <CenterTitleText key={center.id}>{center.name}</CenterTitleText>
                        </CenterTitleBoxContainer>

                        <ProfileCneterTitleText>근무 가능 시간</ProfileCneterTitleText>

                        <ProfileSelectDateCard
                           timeSettingId={center.id}
                            timeSettings={center?.timeSettings[0]}
                            changeType={changeType}
                            index={0}
                        />
                        <TimeSelectCard 
                          onTimeChange={(newTime, timeType) => {
                            changeTime(center.id, newTime, timeType, 0);
                        }}
                        startPickerTime={center.timeSettings[0]?.startTime}
                        endPickerTime={center.timeSettings[0]?.endTime} 
                        imgIcon={clockIcon} 
                        text='profile'/>
                        {
                            center.timeCardAdded && (
                                <React.Fragment>
                                    <ProfileSelectDateCard
                                     timeSettingId={center.id}
                                     timeSettings={center?.timeSettings[1]?.type}
                                     changeType={changeType}
                                     index={1}
                                    />
                                    <TimeSelectCard 
                                     onTimeChange={(newTime, timeType) => {
                                        changeTime(center.id, newTime, timeType, 1);
                                    }}
                                    startPickerTime={center.timeSettings[1]?.startTime}
                                    endPickerTime={center.timeSettings[1]?.endTime} 
                                    imgIcon={clockIcon}
                                    text='profile' />
                                </React.Fragment>
                            )
                        }
                        {
                            center.timeCardAdded === true ? null:
                        <CenterAddGrayBtn onPress={()=>handleAddTimeCard(center.id)}>시간 추가</CenterAddGrayBtn>
                        }
                        </ListContaniner>
                    ))
                }
                </AddCenterListContaniner>
                
                <CenterAddGrayBtn onPress={showCenterListBtn}>센터 추가</CenterAddGrayBtn>
            </CenterListContaniner>

        </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
            {/* {
                isEditMode && 
                <DeleteBtnContainer onPress={openDateSelectModal}>
                    <DeleteBtnText>프로필 삭제</DeleteBtnText>
                </DeleteBtnContainer>
            } */}
  
            {/* <BasicMainBtn 
            isActive={true}
            onPress={postSettingProfile}>승인 요청</BasicMainBtn> */}

            <ProfileSettingBtn
            isActive={isActivefn}
            onPress={isEditModefn}
            openDateSelectModal={openDateSelectModal}
            isEditMode={isEditMode}
            >승인 요청</ProfileSettingBtn>

            {
                deleteProfileModal && (
                    <DeleteProfileModal
                    onPress={deleteProfile}
                    setDeleteProfileModal={setDeleteProfileModal}
                    />
                )
            }
            {
            <CenterListSlideModal 
            modalVisible={modalVisible}
            closeModal={closeModal}
            centerList={centerList}
            text='센터 추가'
            onPress={addCenterListBtn}
            />
            }
            </>
    );
}

export default TrainerInfoListGrid;


const ProfileTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
`;

const ProfileCneterTitleText = styled.Text`
color: ${COLORS.gray_400};
font-size: 14px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.35px;
margin-bottom: 8px;
`;

const ProfileSubTitleText = styled.Text`
color: ${COLORS.gray_300};
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22.4px;
letter-spacing: -0.35px;
`;

const ProfileImgContainer = styled.View`
    margin-top: 16px;
    flex-direction: row;
    flex-wrap: wrap;
`

const ProfileAddBtn = styled.TouchableOpacity`
/* width: 80px;
height: 80px; */
width: 74px;
height: 74px;
border-radius: 10px;
border: 1px solid ${COLORS.gray_200};
background-color: ${COLORS.white};
justify-content: center;
align-items: center;
margin-right: 10px;
`;

const ProfileAddImg = styled(FastImage)`
width: 24px;
height: 24px;
`
const SelectImgContainer = styled.View`
 position: relative;
    /* margin-right: 10px; */
    /* margin-bottom: 10px; */
`

const SelectedImage = styled(FastImage)`
  /* width: 80px;
  height: 80px; */
  width: 74px;
  height: 74px;
    /* width: 96px;
  height: 96px; */
  margin-right: 10px;
    margin-bottom: 10px;
  border-radius: 10px;
`;

const DeleteBtn = styled.TouchableOpacity`
 position: absolute;
    top: 4px;
    right: 12px;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50px;
`
const DeleteImg = styled(FastImage)`
width: 12px;
height: 12px;
`

const CenterInfoContaniner = styled.View`
    margin-top: 40px;
`

const CenterListContaniner = styled.View`
    margin-top: 40px;
    margin-bottom: 108px;
`

// 연동센터 추가 리스트
const AddCenterListContaniner = styled.View`
/* margin-bottom: 20px; */
`

const ListContaniner = styled.View`
border-bottom-width: 1px;
border-bottom-color: ${COLORS.gray_200};
margin-bottom: 30px;
`

const CenterTitleBoxContainer = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 18px;
margin-bottom: 30px;
`

const CenterTitleText = styled.Text`
color: ${COLORS.sub};
font-size: 16px;
font-weight: 500;
line-height: 22.4px;
letter-spacing: -0.4px;
`

const BtnContainer = styled.View`
display: flex;
flex-direction: column;
margin-top: 40px;
background: red;
`

const DeleteBtnContainer = styled.TouchableOpacity`
margin-top: 84px;
/* background-color: red; */
display: flex;
padding: 20px;
align-items: center;
justify-content: center;
`

const DeleteBtnText = styled.Text`
color: ${COLORS.gray_300};
font-size: 16px;
font-weight: 500;
line-height: 22px;
letter-spacing: -0.4px;
`