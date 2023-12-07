import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from 'react';
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


function TrainerInfoListGrid({profileInfo}) {
    UseGetCenterListHook();
    const [centerList, setCenterList] = useRecoilState(centerListState);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState([]);

    const [trainerProfile, setTrainerProfile] = useRecoilState(profileState);

    console.log('profileInfo',trainerProfile)
    // console.log('selectedImages',selectedImages,centerList)
    console.log('dddd@#!@#!@#!@#!@#!@#!@#!@#13123')
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

  

    const addCenterListBtn = (id, name) => {
        console.log('id', id, name);
         // 이미 선택된 센터인지 확인
    const isAlreadySelected = selectedCenter.some(center => center.id === id);

    if (isAlreadySelected) {
        // 이미 선택된 경우 경고 메시지 표시
        Alert.alert("알림", "이미 선택한 센터입니다.\n다른 센터를 선택해주세요.");
    } else {
        // 새로운 센터 추가
        setSelectedCenter([...selectedCenter, { id, name }]);
        setModalVisible(false);
    }
    };


    const handleAddTimeCard = (centerId) => {
        const updatedCenters = selectedCenter.map(center => {
            if (center.id === centerId) {
                if (center.timeCardAdded) {
                    Alert.alert("알림", "시간은 한 번만 추가할 수 있습니다.");
                } else {
                    return { ...center, timeCardAdded: true };
                }
            }
            return center;
        });
        setSelectedCenter(updatedCenters);
    };
   console.log('selectedCenter',selectedCenter)
    const clockIcon = require('../../assets/clockIcon.png');
  
    return (
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            bounces={false}
            extraScrollHeight={60} 
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
                <ProfileTextArea />
            </CenterInfoContaniner>

                <ProfileInput
                title="경력사항"
                placeholder="300자 이하로 작성 가능합니다"
                value={profileInfo.name}
                onChangeText={text => console.log(text)}
                />

                <ProfileInput
                title="자격사항"
                placeholder="300자 이하로 작성 가능합니다"
                value={profileInfo.name}
                onChangeText={text => console.log(text)}
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

                        <ProfileSelectDateCard>평일</ProfileSelectDateCard>
                        <TimeSelectCard imgIcon={clockIcon} text='profile'/>
                        {
                            center.timeCardAdded && (
                                <>
                                    <ProfileSelectDateCard>평일</ProfileSelectDateCard>
                                    <TimeSelectCard 
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
width: 80px;
height: 80px;
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
  width: 80px;
  height: 80px;
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