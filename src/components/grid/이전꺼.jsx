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
import {deleteTrainersProfileInfo} from '../../api/mypageApi';
import DeleteProfileModal from '../modal/DeleteProfileModal';
import { useNavigation } from '@react-navigation/native';

function TrainerInfoListGrid({profileInfo,isEditMode,setIsEditMode}) {
    UseGetCenterListHook();

    const navigation = useNavigation();

    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [selectedCenter, setSelectedCenter] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteProfileModal, setDeleteProfileModal] = useState(false);
    const [timeCardCount, setTimeCardCount] = useState({});


    const [selectedImages, setSelectedImages] = useState([]); 
    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);

    const [centerProfiles, setCenterProfiles] = useState([]);
    const [timeSettings, setTimeSettings] = useState([]);

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

    const addCenterListBtn = (selectedCenterId, selectedCenterName) => {
        // 이미 선택된 센터인지 확인
        const isAlreadyAdded = centerProfiles.some(profile => profile.centerId === selectedCenterId);
    
        if (!isAlreadyAdded) {
            // 중복되지 않은 경우만 추가
            const newProfile = {
                centerId: selectedCenterId, 
                name: selectedCenterName,
                type: "평일",
                startTime: "",
                endTime: ""
            };
    
            setCenterProfiles(prevProfiles => {
                const newProfiles = [...prevProfiles, newProfile];
                console.log('New center profiles:', newProfiles);
                return newProfiles;
            });
    
            setTimeCardCount(prevState => ({
                ...prevState,
                [selectedCenterId]: 1
            }));
        } else {
            // 중복된 경우 알림 메시지를 출력하거나 다른 처리를 수행
            Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
        }
    
        setModalVisible(false);
    
        // 수정된 부분: 로그를 여기로 이동
        console.log('Updated center profiles after adding:', centerProfiles);
    };
    
    
    
 

    function handleAddTimeCard(centerId) {
        const centerIndex = centerProfiles.findIndex(profile => profile.centerId === centerId);
        if (centerIndex !== -1) {
            setCenterProfiles(prevProfiles => {
                const updatedCenter = { ...prevProfiles[centerIndex] };
                const newCenter = {
                    ...updatedCenter,
                    startTime: "",
                    endTime: "",
                    type: "평일"
                };
                const newProfiles = [
                    ...prevProfiles.slice(0, centerIndex),
                    newCenter,
                    ...prevProfiles.slice(centerIndex + 1)
                ];
                console.log('Updated center profiles:', newProfiles);  // Add this line
                return newProfiles;
            }
            );
    
            setTimeCardCount(prevState => ({
                ...prevState,
                [centerId]: (prevState[centerId] || 0) + 1
            }));
        }
        // Add this line
        console.log('Updated center profiles after time card:', centerProfiles);
    }
    
    
    
    
   

    const openDateSelectModal = () => {
        setDeleteProfileModal(true);
    }

    // 프로필 설정
    const postSettingProfile = async () => {
        if(isEditMode){
            console.log('에디터 모드임')

        }else{
            console.log('프로파일 설정!!헤헿',trainerProfile,selectedImages)
            const formData = new FormData();
            const requestDto = {
                    description: trainerProfile.description,
                    career: trainerProfile.career,
                    qualifications: trainerProfile.qualifications,
                    centerProfiles: centerProfiles,
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




    const handleDayChange = (centerId, index, newType) => {
        console.log('s123123123123123123', centerId, index, newType);
        setTimeSettings((prevSettings) => {
            const newSettings = [...prevSettings];  // 새로운 배열을 복사
            newSettings[index] = {
                ...newSettings[index],
                type: newType,
            };
            console.log('time', newSettings);
            return newSettings;
        });
    };
    
    
    
    // handleDayChange = (centerId, index, newType) => {
    //     setTimeSettings(prevState => prevState.map((item, i) => {
    //       if (i === index) {
    //         return {...item, type: newType};
    //       } else {
    //         return item;
    //       }
    //     }));
    //   }

    
    useEffect(() => {
        console.log('Updated time settings:', timeSettings);
    }, [timeSettings]);

    
   console.log('centerProfiles',centerProfiles)
   console.log('timeSettings',timeSettings)
      
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
                    centerProfiles.length === 0 &&<ProfileCneterTitleText>센터별 설정</ProfileCneterTitleText>
                }
             <AddCenterListContaniner>
               {
                    centerProfiles.map((center, index) => (
                        <ListContaniner  key={center.id}>
                        <ProfileCneterTitleText>연동센터{index+1}</ProfileCneterTitleText>
                        <CenterTitleBoxContainer>
                        <CenterTitleText key={center.id}>{center.name}</CenterTitleText>
                        </CenterTitleBoxContainer>

                        <ProfileCneterTitleText>근무 가능 시간</ProfileCneterTitleText>

                        {[...Array(timeCardCount[center.centerId] || 1)].map((_, i) => (
    <React.Fragment key={`${center.centerId}-${i}`}>
        <ProfileSelectDateCard
            type={timeSettings && timeSettings[i] ? timeSettings[i].type : ""}
            onTypeChange={(newType) => handleDayChange(center.centerId, i, newType)}
        />
        <TimeSelectCard 
            imgIcon={clockIcon} 
            text='profile'
        />
    </React.Fragment>
))}


        {timeCardCount[center.centerId] < 2 && (
            <CenterAddGrayBtn onPress={()=>handleAddTimeCard(center.centerId)}>시간 추가</CenterAddGrayBtn>
        )}

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