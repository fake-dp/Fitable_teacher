import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {getCenterSign, postNewIntegrateContract} from '../../api/contractApi';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {centerIdState, contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

function SignContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  const [contract, setContract] = useRecoilState(contractState);

  const updateName = (key, value) => {
    setContract(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const goEditSign = currentView => {
    navigation.navigate('Sign', {currentView});
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getCenterSign(centerId);
      if (response) {
        setContract(prev => {
          return {
            ...prev,
            ['centerSign']: {uri: response.imagePath, file: null},
          };
        });
      }
    };

    getData();
  }, []);

  const registerNewContract = async () => {
    console.log('registerNewContract', contract.editSelectedContracts);

    try {
      const formData = new FormData();

      console.log('contract');

      const requestDto = {
        templateId: contract.contractTemplate.id,
        memberId: memberId,
        memberName: contract.memberName,
        trainerName: contract.teacherName,
        centerId: centerId,
        centerName: contract.centerName,
        ticketList: contract.editSelectedContracts,
        termsAgreement: true,
        privateAgreement: true,
        advertisingAgreement: true,
      };

      if (contract['memberSign']?.file) {
        formData.append('memberSignImage', {
          name: 'memberSign.png',
          type: 'image/png',
          uri: contract['memberSign']?.uri,
        });
      }

      if (contract['teacherSign']?.file) {
        formData.append('adminSignImage', {
          name: 'adminSignImage.png',
          type: 'image/png',
          uri: contract['teacherSign']?.uri,
        });
      }

      if (contract['centerSign']?.file) {
        formData.append('centerSignImage', {
          name: 'centerSign.png',
          type: 'image/png',
          uri: contract['centerSign']?.uri,
        });
      } else {
        requestDto.centerSignatureImagePath = contract['centerSign'].uri;
      }

      formData.append('requestDto', JSON.stringify(requestDto));

      const response = await postNewIntegrateContract(formData);
      if (response) {
        navigation.navigate('ContractSuccess', {memberId});
      }
    } catch (error) {
      Alert('post 실패');
    }
  };

  let isActive =
    contract.memberName &&
    contract.centerName &&
    contract.teacherName &&
    contract['memberSign'].uri &&
    contract['teacherSign'];

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <View style={{gap: 24}}>
          <Container style={{gap: 14}}>
            <SignedDashedBorder onPress={() => goEditSign('memberSign')}>
              {contract['memberSign']?.uri ? (
                <SignedImage
                  source={{uri: contract['memberSign'].uri}}
                  resizeMode="contain"
                />
              ) : (
                <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
              )}
            </SignedDashedBorder>

            <SigendInputContainer>
              <InfoTitleText>회원</InfoTitleText>
              <InfoTextInput
                placeholder="입력해주세요"
                value={contract.memberName}
                onChangeText={text => {
                  updateName('memberName', text);
                }}
              />
            </SigendInputContainer>
          </Container>

          <Container style={{gap: 14}}>
            <SignedDashedBorder onPress={() => goEditSign('teacherSign')}>
              {contract['teacherSign']?.uri ? (
                <SignedImage
                  source={{uri: contract.teacherSign.uri}}
                  resizeMode="contain"
                />
              ) : (
                <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
              )}
            </SignedDashedBorder>

            <SigendInputContainer>
              <InfoTitleText>강사</InfoTitleText>
              <InfoTextInput
                placeholder="입력해주세요"
                value={contract.teacherName}
                onChangeText={text => {
                  updateName('teacherName', text);
                }}
              />
            </SigendInputContainer>
          </Container>

          <Container style={{gap: 14}}>
            <SignedDashedBorder onPress={() => goEditSign('centerSign')}>
              {contract['centerSign']?.uri ? (
                <SignedImage
                  source={{uri: contract.centerSign.uri}}
                  resizeMode="contain"
                />
              ) : (
                <SignedDashedBorder.Text>서명(인)</SignedDashedBorder.Text>
              )}
            </SignedDashedBorder>

            <SigendInputContainer>
              <InfoTitleText>센터</InfoTitleText>
              <InfoTextInput
                placeholder="입력해주세요"
                value={contract.centerName}
                onChangeText={text => {
                  updateName('centerName', text);
                }}
              />
            </SigendInputContainer>
          </Container>
        </View>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          disabled={!isActive}
          isActive={isActive}
          onPress={() => registerNewContract()}>
          <BasicMainBtnNextBtnNextText isActive={isActive}>
            작성완료
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default SignContractScreen;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
  /* align-items: center; */
  /* justify-content: center;     */
`;

const BasicMainBtnNextBtn = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  border-radius: 90px;
  align-items: center;
  justify-content: center;
  padding: 14px 0;
  width: 100%;
`;

const BasicMainBtnNextBtnNextText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  color: ${COLORS.white};
`;

const InfoTitleText = styled.Text`
  color: ${COLORS.gray_400};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 4px;
`;

const InfoTextInput = styled.TextInput`
  height: 50px;
  font-size: 14px;
  color: ${COLORS.sub};
  font-weight: 400;
  background-color: ${COLORS.gray_100};
  border-radius: 10px;
  padding: 14px 16px;
`;

const SignedDashedBorder = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px dashed ${COLORS.gray_300};
  background: ${COLORS.white};
`;

SignedDashedBorder.Text = styled.Text`
  color: ${COLORS.gray_300};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.35px;
`;

const SigendInputContainer = styled.View`
  flex: 1;
`;

const SignedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
