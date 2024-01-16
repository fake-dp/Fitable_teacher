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
import {ScrollView, Text, TextInput, View} from 'react-native';
import {text} from 'react-native-communications';

const paymentTypeItem = [
  {
    label: '카드',
    value: 'CARD',
  },
  {
    label: '현금',
    value: 'CASH',
  },
  {
    label: '계좌이체',
    value: 'BANK_TRANSFER',
  },
  {
    label: '결제링크',
    value: 'PAYMENT_LINK',
  },
];

function EditContractScreen(props) {
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

  const [text1234, setText1234] = useState('');

  const [editContract, setEditContract] = useState([]);

  useEffect(() => {
    setEditContract(contract.selectedContractes);
    console.log('hello!!!', contract.selectedContractes);
  }, []);

  const updateConractDetail = (item, key, value) => {
    const updatedContract = editContract.map(contract => {
      if (contract.id === item.id) {
        return {
          ...contract,
          [key]: value,
        };
      }
      return contract;
    });

    setEditContract(updatedContract);
  };

  const goContractAgreement = () => {
    navigation.navigate('AgreementContract', {memberId});
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        <ContractTitle>{contract.contractTemplate.name}</ContractTitle>

        <Divider />

        <View style={{gap: 20, marginTop: 30}}>
          {contract.selectedContractes?.map((item, index) => {
            return (
              <>
                <View>
                  <TitleText>{`상품 ${index + 1}`}</TitleText>

                  <Container>
                    <InfoTitleText>기간</InfoTitleText>

                    <DateContainer>
                      <TextInput
                        style={{width: 90}}
                        value={editContract[index]?.startDate}
                        onChangeText={text => {
                          updateConractDetail(item, 'startDate', text);
                        }}
                      />
                      <Text>{`~`}</Text>
                      <TextInput
                        style={{width: 90}}
                        value={editContract[index]?.endDate}
                        onChangeText={text => {
                          updateConractDetail(item, 'endDate', text);
                        }}
                      />
                    </DateContainer>
                  </Container>

                  <Container>
                    <InfoTitleText>이용권 상품</InfoTitleText>
                    <PriceTextInput
                      placeholder="0원"
                      value={editContract[index]?.name}
                      onChangeText={text => {
                        updateConractDetail(item, 'name', text);
                      }}
                    />
                  </Container>
                  <Container>
                    <InfoTitleText>횟수</InfoTitleText>

                    <View style={{width: 100}}>
                      <PriceTextInput
                        placeholder="0회"
                        keyboardType="number-pad"
                        onChangeText={text => {
                          updateConractDetail(item, 'time', text);
                        }}
                      />
                    </View>
                  </Container>
                  <Container>
                    <PriceContainer style={{gap: 11}}>
                      <PriceInnerContainer>
                        <InfoTitleText>결제수단</InfoTitleText>
                        <PriceTextInput
                          placeholder="결제수단"
                          onChangeText={text => {
                            updateConractDetail(item, 'paymentType', text);
                          }}
                        />
                      </PriceInnerContainer>

                      <PriceInnerContainer>
                        <InfoTitleText>금액(원)</InfoTitleText>
                        <PriceTextInput
                          placeholder="0원"
                          keyboardType="number-pad"
                          onChangeText={text => {
                            updateConractDetail(item, 'price', text);
                          }}
                        />
                      </PriceInnerContainer>
                    </PriceContainer>
                  </Container>

                  <Divider />
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract.selectedContractes.length > 0}
          onPress={() => goContractAgreement(memberId)}>
          <BasicMainBtnNextBtnNextText
            isActive={contract.selectedContractes.length > 0}>
            다음
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default EditContractScreen;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.35px;
  color: ${COLORS.gray_400};
  margin-bottom: 10px;
`;

const ContractCard = styled.TouchableOpacity`
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 14px 16px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${props =>
    props.isActive &&
    css`
      background-color: ${COLORS.sub};
    `}
`;

const ContractTitle = styled.Text`
  color: ${COLORS.sub};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 29px;
`;

const DateContainer = styled.View`
  width: 205px;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${COLORS.gray_100};
  align-items: center;
  padding: 0px 10px;
`;

const Container = styled.View`
  margin-bottom: 26px;
`;

const TitleText = styled.Text`
  color: ${COLORS.sub};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
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
  font-family: Pretendard;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 8px;
`;

const PriceContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const PriceInnerContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const PriceTextInput = styled.TextInput.attrs(props => ({
  editable: !props.disabled,
  placeholderTextColor: props.disabled ? COLORS.sub : COLORS.gray_300,
}))`
  width: 100%;
  font-size: 14px;
  color: ${COLORS.gray_300};
  font-weight: 400;
  border: 1px solid ${COLORS.gray_100};
  background-color: ${COLORS.gray_100};
  border-radius: 13px;
  padding: 15px 16px;
  margin-bottom: 8px;
`;

const Divider = styled.View`
  background-color: ${COLORS.gray_100};
  width: 100%;
  height: 1px;
`;
