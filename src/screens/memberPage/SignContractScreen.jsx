import React from 'react';
import {MainContainer} from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import styled, {css} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getMemberContractList} from '../../api/memberApi';
import {useRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {getMemberContractTicketList} from '../../api/memberApi';
import {Alert, ScrollView, Text, TextInput, View} from 'react-native';
import {getCenterSign, postNewIntegrateContract} from '../../api/contractApi';

function SignContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  // const {memberId} = route.params;
  const memberId = `0bb89eca-16e4-43f5-b3f3-0dcbdb488bd6`;

  // const [centerId, setCenterId] = useRecoilState(centerIdState);
  const centerId = `18c09191-e393-4f0d-80cf-b0eff1348e3d`;

  const [contract, setContract] = useRecoilState(contractState);

  const [editContract, setEditContract] = useState([]);

  useEffect(() => {
    console.log('contract', contract);
  }, []);

  const updateName = (key, value) => {
    setContract(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const goContractAgreement = () => {
    navigation.navigate('AgreementContract', {memberId});
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
            ['centerSign']: response.imagePath,
          };
        });
      }
    };

    getData();
  }, []);

  const registerNewContract = async () => {
    try {
      const formData = new FormData();

      const requestDto = {
        templateId: contract.contractTemplate.id,
        memberId: memberId,
        memberName: contract.memberName,
        trainerName: contract.teacherName,
        centerId: centerId,
        centerName: contract.centerName,

        ticketList: contract.contractTemplate,
        termsAgreement: true,
        privateAgreement: true,
        advertisingAgreement: true,
      };

      if (contract.memberSign) {
        formData.append('images', {
          uri: contract.memberSign,
          type: 'image/jpeg',
          name: `image${'memberSign'}.jpg`,
        });
      }

      if (contract.teacherSign) {
        formData.append('images', {
          uri: contract.teacherSign,
          type: 'image/jpeg',
          name: `image${'teacherSign'}.jpg`,
        });
      }

      if (contract.centerSign) {
        formData.append('images', {
          uri: contract.centerSign,
          type: 'image/jpeg',
          name: `image${'centerSign'}.jpg`,
        });
      } else {
        requestDto.centerSignatureImagePath = contract.contractTemplate.id;
      }

      formData.append('requestDto', JSON.stringify(requestDto));

      postNewIntegrateContract(formData);
    } catch (error) {
      Alert('post 실패');
    }
  };

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
              {contract.memberSign ? (
                <SignedImage
                  source={{uri: contract.memberSign}}
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
              {contract.teacherSign ? (
                <SignedImage
                  source={{uri: contract.teacherSign}}
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
              {contract.centerSign ? (
                <SignedImage
                  source={{uri: contract.centerSign}}
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
          isActive={contract.selectedContractes.length > 0}
          onPress={() => registerNewContract(memberId)}>
          <BasicMainBtnNextBtnNextText
            isActive={contract.selectedContractes.length > 0}>
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
