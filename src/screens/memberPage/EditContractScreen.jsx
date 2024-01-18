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

const paymentTypeItem = {
  CARD: '카드',
  CASH: '현금',
  BANK_TRANSFER: '계좌이체',
  PAYMENT_LINK: '결제링크',
};

function EditContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [contract, setContract] = useRecoilState(contractState);

  const [editContract, setEditContract] = useState([]);

  useEffect(() => {
    if (editContract.editSelectedContracts) {
      console.log('ㅠㅠ');
      setEditContract([contract.editSelectedContracts]);
    } else {
      setEditContract(contract.selectedContracts);
    }
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
    setContract(prev => {
      return {...prev, ['editSelectedContracts']: editContract};
    });
    navigation.navigate('AgreementContract', {memberId});
  };

  const isActive = () => {
    // let result = false;

    let result = false;

    (editContract || []).forEach(contract => {
      console.log('@@@@@@', contract);

      result = (
        [
          contract.name,
          contract.time,
          contract.startDate,
          contract.paymentType,
          contract.price,
        ] || []
      ).some(element => {
        return element !== 0 && !element;
      });
    });
    console.log('result', result);

    return !result;
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
          {contract.selectedContracts?.map((item, index) => {
            return (
              <>
                <View>
                  <TitleText>{`상품 ${index + 1}`}</TitleText>

                  <Container>
                    <InfoTitleText>기간</InfoTitleText>

                    <DateContainer>
                      <TextInput
                        style={{width: 87}}
                        value={editContract[index]?.startDate}
                        onChangeText={text => {
                          updateConractDetail(item, 'startDate', text);
                        }}
                      />
                      <DateContainer.Text>{`~`}</DateContainer.Text>
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
                      placeholder="이용권 상품"
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
                        value={String(editContract[index]?.time)}
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
                          value={
                            paymentTypeItem[editContract[index]?.paymentType] ||
                            editContract[index]?.paymentType
                          }
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
                          value={String(editContract[index]?.price)}
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
          isActive={isActive()}
          onPress={() => goContractAgreement(memberId)}>
          <BasicMainBtnNextBtnNextText isActive={isActive()}>
            다음
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default EditContractScreen;

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

DateContainer.Text = styled.Text`
  color: ${COLORS.sub};
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
  color: ${COLORS.sub};
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
