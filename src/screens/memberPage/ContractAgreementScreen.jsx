import CheckBox from '@react-native-community/checkbox';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled, {css} from 'styled-components/native';
import {getContractAgreement} from '../../api/contractApi';
import GobackGrid from '../../components/grid/GobackGrid';
import ContractAgreementModal from '../../components/modal/ContractAgreementModal';
import {COLORS} from '../../constants/color';
import {centerIdState, contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

function ContractAgreementScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [contract, setContract] = useRecoilState(contractState);

  const goSignContract = () => {
    navigation.navigate('SignContract', {memberId});
  };

  const [isTotalAgreement, setIsTotalAgreement] = useState(false);
  const [isTermsAgree, setIsTermsAgree] = useState(false);
  const [isPrivateAgree, setIsPrivateAgree] = useState(false);
  const [isAdvertisementAgree, setIsAdverTisementAgree] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const openAgreementModal = async agreement => {
    setCurrentAgreement(agreement);
    setModalVisible(true);
  };

  const [detailData, setDetailData] = useState('');

  const [currentAgreement, setCurrentAgreement] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await getContractAgreement(contract.contractTemplate.id);
      if (response) {
        setDetailData(response);
      }
    };

    getData();
  }, []);

  const getTitle = () => {
    if (currentAgreement === 'termsAgreement') {
      return '이용약관';
    }

    if (currentAgreement === 'privateAgreement') {
      return '개인정보 이용 동의서';
    }

    if (currentAgreement === 'advertisingAgreement') {
      return '광고성 정보 이용 동의서';
    }
  };

  const getDetailData = () => {
    if (currentAgreement === 'termsAgreement') {
      return detailData.termsAgreement;
    }

    if (currentAgreement === 'privateAgreement') {
      return detailData.privateAgreement;
    }

    if (currentAgreement === 'advertisingAgreement') {
      return detailData.advertisingAgreement;
    }
  };

  useEffect(() => {
    if (isTermsAgree && isPrivateAgree && isAdvertisementAgree) {
      setIsTotalAgreement(true);
    } else {
      setIsTotalAgreement(false);
    }
  }, [isTermsAgree, isPrivateAgree, isAdvertisementAgree]);

  const isActive = isTermsAgree && isPrivateAgree && isAdvertisementAgree;

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <ContractAgreementModal
          title={getTitle()}
          detailData={getDetailData()}
          modalVisible={modalVisible}
          closeModal={() => {
            setModalVisible(false);
          }}
        />

        <View
          style={{
            flexDirection: 'column',
          }}>
          <View>
            <TotalAgreement.Container>
              <TotalAgreement.Text isActive={true}>
                약관 전체동의
              </TotalAgreement.Text>

              <CheckBoxBtn
                isChecked={isTotalAgreement}
                setIsChecked={setIsTotalAgreement}
                handleCheckboxChange={() => {
                  setIsTermsAgree(!isTotalAgreement);
                  setIsPrivateAgree(!isTotalAgreement);
                  setIsAdverTisementAgree(!isTotalAgreement);
                  setIsTotalAgreement(!isTotalAgreement);
                }}
              />
            </TotalAgreement.Container>
          </View>

          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: 20,
              gap: 24,
            }}>
            <Agreement.Container
              onPress={() => openAgreementModal('termsAgreement')}>
              <Agreement.Text>이용약관 동의</Agreement.Text>

              <CheckBoxBtn
                isChecked={isTermsAgree}
                setIsChecked={setIsTermsAgree}
                handleCheckboxChange={() => {
                  setIsTermsAgree(!isTermsAgree);
                }}
              />
            </Agreement.Container>

            <Agreement.Container
              onPress={() => openAgreementModal('privateAgreement')}>
              <Agreement.Text>개인정보 이용 동의서</Agreement.Text>

              <CheckBoxBtn
                isChecked={isPrivateAgree}
                setIsChecked={setIsPrivateAgree}
                handleCheckboxChange={() => {
                  setIsPrivateAgree(!isPrivateAgree);
                }}
              />
            </Agreement.Container>

            <Agreement.Container
              onPress={() => openAgreementModal('advertisingAgreement')}>
              <Agreement.Text>광고성 정보 이용 동의서</Agreement.Text>

              <CheckBoxBtn
                isChecked={isAdvertisementAgree}
                setIsChecked={setIsAdverTisementAgree}
                handleCheckboxChange={() => {
                  setIsAdverTisementAgree(!isAdvertisementAgree);
                }}
              />
            </Agreement.Container>
          </View>
        </View>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          disabled={!isActive}
          isActive={isActive}
          onPress={() => goSignContract(memberId)}>
          <BasicMainBtnNextBtnNextText isActive={isActive}>
            다음
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractAgreementScreen;

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

const TotalAgreement = styled``;

TotalAgreement.Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 60px;

  border-radius: 13px;
  background-color: ${COLORS.sub};
  padding: 19px 20px;
`;

TotalAgreement.Text = styled.Text`
  font-size: 16px;
  color: ${COLORS.gray_300};
  line-height: 21.2px;

  ${props =>
    props.isActive &&
    css`
      color: ${COLORS.main};
    `};
`;

const Agreement = styled``;

Agreement.Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

Agreement.Text = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${COLORS.sub};
  line-height: 21.2px;
  text-decoration-line: underline;
`;

function CheckBoxBtn({isChecked, setIsChecked, handleCheckboxChange}) {
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };

  return (
    <>
      <CheckBoxStyle
        value={isChecked}
        onValueChange={handleCheckboxChange}
        tintColors={{true: COLORS.main, false: COLORS.gray_200}}
        onCheckColor={COLORS.main}
        onFillColor={COLORS.box}
        onTintColor={COLORS.box}
        boxType={'square'}
        tintColor={COLORS.gray_300}
      />
    </>
  );
}

const CheckBoxStyle = styled(CheckBox)`
  width: 20px;
  height: 20px;
`;
