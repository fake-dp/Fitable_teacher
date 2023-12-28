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
import {deleteTrainersProfileInfo,setTrainersProfileInfo,updateTrainersProfileInfo} from '../../api/mypageApi';
import DeleteProfileModal from '../modal/DeleteProfileModal';
import { useNavigation } from '@react-navigation/native';

function TrainerInfoListGrid({profileInfo,isEditMode,setIsEditMode}) {
    UseGetCenterListHook();

    const navigation = useNavigation();

    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [selectedCenter, setSelectedCenter] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteProfileModal, setDeleteProfileModal] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]); 
    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);



    const openImagePicker = () => {
    ImagePicker.openPicker({
        multiple: true, 
        maxFiles:10 - selectedImages.length, 
        width: 300,
        height: 400,
        cropping: true,
      })
      .then(newImages => {
        console.log(newImages);
      //   setSelectedImages(images.map(image => image.path));
        setSelectedImages([...selectedImages, ...newImages.map(image => image.path)].reverse());
      })
      .catch(error => {
        console.log(error);
      });
  };

    const deleteImage = (indexToDelete) => {
        setSelectedImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToDelete)
        );
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

    // 프로필 설정
    const postSettingProfile = async () => {
        if(isEditMode){
            console.log('에디터 모드임')
            let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
            const formData = new FormData();
            const requestDto = {
                description: trainerProfile.description,
                career: trainerProfile.career,
                qualifications: trainerProfile.qualifications,
                centerProfiles: combinedTimeSettings,
        };
        selectedImages.forEach((image, index) => {
            // 이미지 파일 이름을 지정하여 FormData에 추가
            formData.append('images', {
                uri: image, // 이미지 파일 경로 또는 URL
                type: 'image/jpeg', // 이미지 타입 (예: image/jpeg)
                name: `image${index}.jpg` // 이미지 파일 이름
            });
        });
        updateSettingProfileApi(formData);
        console.log('formData111123',formData)
        console.log('requestDto',requestDto)

        }else{
            console.log('프로파일 설정!!헤헿',trainerProfile,selectedImages)
            let combinedTimeSettings = (selectedCenter[0]?.timeSettings || []).concat(selectedCenter[1]?.timeSettings || []);
            console.log('combinedTimeSettings', combinedTimeSettings);
    
            // 합친 배열을 centerProfiles 상태에 저장
           
            const formData = new FormData();
            const requestDto = {
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: combinedTimeSettings,
            };

            formData.append("requestDto", JSON.stringify(requestDto));
            selectedImages.forEach((image, index) => {
                // 이미지 파일 이름을 지정하여 FormData에 추가
                formData.append('images', {
                    uri: image, // 이미지 파일 경로 또는 URL
                    type: 'image/jpeg', // 이미지 타입 (예: image/jpeg)
                    name: `image${index}.jpg` // 이미지 파일 이름
                });
            });
            console.log('formData111123',formData)
            postSettingProfileApi(formData);
        }
    }

    //프로필 설정api
    const postSettingProfileApi = async (formData) => {
        try{
            const response = await setTrainersProfileInfo(formData);
            if(response){
                console.log('response',response);
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
        try{
            const response = await updateTrainersProfileInfo(formData);
            if(response){
                console.log('response',response);
            }
        }catch(error){
            console.log('updateSettin',error)
        }finally{
            console.log('finally')
            navigation.navigate('MyProfile')
        }
    }


    // 프로필 삭제용
    const deleteProfile = async () => {
console.log('dkdkdk')
        try{
            const response = await deleteTrainersProfileInfo();
            if(response){
                console.log('response',response);
                setSelectedImages([])
                setSelectedCenter([])
                setTrainerProfile([])
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
                    endTime: "24:00"
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
            endTime: "24:00"
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
    
  

  
      
   console.log('selectedCenter11',selectedCenter[0]?.timeSettings)
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
  {selectedImages.length === 10 ? null :
    <ProfileAddBtn onPress={openImagePicker}>
      <ProfileAddImg source={require('../../assets/img/plus_l.png')} />
    </ProfileAddBtn>
  }

  {isEditMode ? (
    profileInfo.images.map((image, index) => (
      <SelectImgContainer key={index}>
        <DeleteBtn key={index} onPress={() => deleteImage(index)}>
          <DeleteImg source={require('../../assets/img/delete.png')} />
        </DeleteBtn>
        <SelectedImage source={{ uri: image.path }} />
      </SelectImgContainer>
    ))
  ) : (
    selectedImages.length > 0 && (
      <>
        {selectedImages.map((image, index) => (
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
            <BasicMainBtn onPress={postSettingProfile}>승인 요청</BasicMainBtn>
            {
                isEditMode && <CenterAddGrayBtn onPress={openDateSelectModal}>프로필 삭제</CenterAddGrayBtn>
            }
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

const ProfileAddImg = styled.Image`
`
const SelectImgContainer = styled.View`
 position: relative;
    /* margin-right: 10px; */
    /* margin-bottom: 10px; */
`

const SelectedImage = styled.Image`
  /* width: 80px;
  height: 80px; */
  width: 74px;
  height: 74px;
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
const DeleteImg = styled.Image`
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