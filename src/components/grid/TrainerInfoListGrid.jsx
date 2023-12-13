import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import ImagePicker from 'react-native-image-crop-picker';
import React,{ useState,useCallback } from 'react';
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

function TrainerInfoListGrid({profileInfo}) {
    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]); 
    const [selectedCenter, setSelectedCenter] = useState([]);

    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);

    console.log('profileInfo',trainerProfile)
    // console.log('selectedImages',selectedImages,centerList)
    console.log('dddd@#!@#!@#!@#!@#!@#!@#!@#13123',trainerProfile.centerProfiles)
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

//     const addCenterListBtn = (selectedCenterId) => {
//         const isCenterAlreadyAdded = trainerProfile.centerProfiles.some(center => center.centerId === selectedCenterId);
//         if (isCenterAlreadyAdded) {
//             // 중복된 경우 경고 표시
//             Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
//             return; // 함수 실행 중단
//         }

//         const selectedCenter = centerList.find(center => center.id === selectedCenterId);
//         const selectedCenterName = selectedCenter && selectedCenter.name;

//         const newCenterProfile = {
//             centerName: selectedCenterName,
//             centerId: selectedCenterId,
//             type: "평일", // 기본값 설정
//             startTime: "09:00:00", // 기본값 설정
//             endTime: "18:00:00" // 기본값 설정
//           };
//           // trainerProfile의 centerProfiles 배열에 새 센터 프로필 추가
//           setTrainerProfile(prevState => ({
//             ...prevState,
//             centerProfiles: [...prevState.centerProfiles, newCenterProfile]
//           }));
//           setModalVisible(false);
// };

       // 시간 추가 핸들러
    //    const handleAddTimeCard = (centerId) => {
    //     console.log('centerId',centerId)
    //     const newTimeSetting = {
    //         centerId: centerId, // 새로운 센터 ID 생성 또는 사용자로부터 입력 받음
    //         type: "평일", // 기본값 또는 사용자 입력값
    //         startTime: "09:00:00", // 사용자 입력값
    //         endTime: "18:00:00", // 사용자 입력값
    //     };
    
    //     setTrainerProfile(prevState => ({
    //         ...prevState,
    //         centerProfiles: [...prevState.centerProfiles, newTimeSetting]
    //     }));
    // };

    // const addCenterListBtn = (id, name) => {
    //     console.log('id', id, name);
    //     const newTimeSetting = {
    //         centerId: id, // 새로운 센터 ID 생성 또는 사용자로부터 입력 받음
    //         type: "주말일", // 기본값 또는 사용자 입력값
    //         startTime: "09:00:00", // 사용자 입력값
    //         endTime: "18:00:00", // 사용자 입력값
    //     };
    //      // 이미 선택된 센터인지 확인
    // const isAlreadySelected = selectedCenter.some(center => center.id === id);

    // if (isAlreadySelected) {
    //     // 이미 선택된 경우 경고 메시지 표시
    //     Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
    // } else {
    //     // 새로운 센터 추가
    //     setSelectedCenter([...selectedCenter, newTimeSetting, { id, name }]);
    //     setModalVisible(false);
    // }
    // };
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
                    startTime: "09:00",
                    endTime: "18:00"
                }]
            };
            setSelectedCenter(prevCenters => [...prevCenters, newCenter]);
            setModalVisible(false);
        }
    };



    // const handleAddTimeCard = (centerId) => {
    //             const newTimeSetting = {
    //         centerId: centerId, // 새로운 센터 ID 생성 또는 사용자로부터 입력 받음
    //         type: "평일", // 기본값 또는 사용자 입력값
    //         startTime: "09:00:00", // 사용자 입력값
    //         endTime: "18:00:00", // 사용자 입력값
    //     };

    //     const updatedCenters = selectedCenter.map(center => {
    //         if (center.id === centerId) {
    //             if (center.timeCardAdded) {
    //                 Alert.alert("알림", "시간은 한 번만 추가할 수 있습니다.");
    //             } else {
    //                 return { ...center, newTimeSetting , timeCardAdded: true};
    //             }
    //         }
    //         return center;
    //     });
    //     setSelectedCenter(updatedCenters);
    // };
    const handleAddTimeCard = (centerId) => {
        const newTimeSetting = {
            centerId: centerId,
            type: "평일@!", // 사용자 입력값 또는 기본값
            startTime: "09:00", // 사용자 입력값 또는 기본값
            endTime: "18:00"  // 사용자 입력값 또는 기본값
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
    
   console.log('selectedCenter',selectedCenter[0]?.timeSettings)
   console.log('selectedCenter',selectedCenter[1]?.timeSettings)
    // 이제 각 센터의 UI는 center의 startTime, endTime, type을 직접 사용하여 렌더링합니다.
    

    // [{"centerId": "18c09191-e393-4f0d-80cf-b0eff1348e3d", 
    // "endTime": "18:00:00", 
    // "startTime": "09:00:00", 
    // "type": "평일"}, 
    // {"centerId": "6a85762b-5d0c-4506-bdbb-1f2d640ddab1", 
    // "endTime": "18:00:00", 
    // "startTime": "09:00:00", 
    // "type": "평일"
    // }]


    // [{"endTime": "", "startTime": "", "type": "",centerId:""}]
    
      // 데이터 초기화
    //   useFocusEffect(
    //     useCallback(() => {
    //         return () => {
    //             setTrainerProfile({
    //                 description: '',
    //                 career: '',
    //                 qualifications: '',
    //                 centerProfiles: []
    //             });
    //         }
    //     }, [])
    // );
      
    const clockIcon = require('../../assets/clockIcon.png');
  
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
                    {
                        selectedImages.length === 10 ? null:
                        <ProfileAddBtn onPress={openImagePicker}>
                        <ProfileAddImg source={require('../../assets/plus_l.png')} />
                        </ProfileAddBtn>
                    }
                      {
                        selectedImages.length > 0 ? (
                     <>
                           {
                    selectedImages.map((image, index) => (
                        <SelectImgContainer key={index}>
                        <DeleteBtn key={index} onPress={() => deleteImage(index)}>
                            <DeleteImg source={require('../../assets/delete.png')} />
                        </DeleteBtn>
                            <SelectedImage source={{ uri: image }} />
                        </SelectImgContainer>
                    ))
                }
                        </>
                ):(null)
            }

                </ProfileImgContainer>


            {/* <SelectProfileItemBtn>종목선택</SelectProfileItemBtn> */}
            <CenterInfoContaniner>

            <ProfileCneterTitleText>소개</ProfileCneterTitleText>
                <ProfileTextArea 
                 maxLength={150}
                 value={trainerProfile.description}
                 onChangeText={text => setTrainerProfile(prevState => ({
                      ...prevState,
                      description: text
                  }))}
                />
            </CenterInfoContaniner>

                <ProfileInput
                title="경력사항"
                placeholder="300자 이하로 작성 가능합니다"
                maxLength={300}
                value={trainerProfile.career}
                 onChangeText={text => setTrainerProfile(prevState => ({
                     ...prevState,
                 career: text
                 }))}
                />

                <ProfileInput
                title="자격사항"
                placeholder="300자 이하로 작성 가능합니다"
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
                        centerId={center.id}
                        timeSettings={center.timeSettings[0]?.type}
                        />
                        <TimeSelectCard 
                         index={0}
                        setSelectedCenter={setSelectedCenter}
                        timeSettings={center?.timeSettings[0]}
                        imgIcon={clockIcon} 
                        text='profile'/>
                        {
                            center.timeCardAdded && (
                                <>
                                    <ProfileSelectDateCard
                                     timeSettings={center.timeSettings[1]?.type}
                                    />
                                    <TimeSelectCard 
                                   index={1}
                                      setSelectedCenter={setSelectedCenter}
                                    timeSettings={center?.timeSettings[1]}
                                    imgIcon={clockIcon}
                                    text='profile' />
                                </>
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
            <BasicMainBtn>승인 요청</BasicMainBtn>
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