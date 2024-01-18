import React from 'react';
import {MainContainer} from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import styled, {css} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getIntergrateTemplate} from '../../api/contractApi';

import {useRecoilState, useResetRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {getMemberContractTicketList} from '../../api/memberApi';
import {ScrollView, Text, View} from 'react-native';

function ContractTicketScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => {
    navigation.goBack();
  };

  const {memberId} = route.params;

  const [centerId, setCenterId] = useRecoilState(centerIdState);

  const [contract, setContract] = useRecoilState(contractState);

  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const getMemberContractTicketListData = async () => {
      try {
        const response = await getMemberContractTicketList({
          centerId,
          memberId,
        });
        if (response) {
          setContractList(response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    const getIntergrateTemplate = async () => {
      try {
        const response = await getIntergrateTemplate({
          templateId: contract.contractTemplate.id,
        });
        if (response) {
          console.log('getIntergrate', response);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    if (centerId && memberId) {
      getMemberContractTicketListData();
      getIntergrateTemplate();
    }
  }, []);

  const onPressContractBtn = item => {
    if (contract.selectedTickets.some(contract => contract.id === item.id)) {
      const updatedContractData = contract.selectedTickets.filter(
        contract => contract.id !== item.id,
      );

      setContract(prev => {
        return {
          ...prev,
          ['selectedTickets']: updatedContractData,
        };
      });
    } else {
      const updatedContractData = [...contract.selectedTickets, item];

      setContract(prev => {
        return {
          ...prev,
          ['selectedTickets']: updatedContractData,
        };
      });
    }
  };

  const goEditContract = () => {
    navigation.navigate('EditContract', {memberId});
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <Title>이용 중인 이용권 선택</Title>
      {contractList?.tickets?.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{marginBottom: 100}}>
          {contractList?.tickets?.map((item, index) => {
            return (
              <ContractCard
                key={item.id}
                isActive={contract.selectedTickets.some(
                  contract => contract.id === item.id,
                )}
                onPress={() => onPressContractBtn(item)}>
                <ContractTitle
                  isActive={contract.selectedTickets.some(
                    contract => contract.id === item.id,
                  )}>
                  {item.name.length > 16
                    ? item.name.substring(0, 16) + '...'
                    : item.name}
                </ContractTitle>
              </ContractCard>
            );
          })}
        </ScrollView>
      )}

      {contractList?.tickets?.length === 0 && (
        <EmptyView>
          <Text style={{color: COLORS.gray_300}}>등록된 계약서가 없습니다</Text>
        </EmptyView>
      )}

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract.selectedTickets.length > 0}
          disabled={contract.selectedTickets.length < 1}
          onPress={() => goEditContract()}>
          <BasicMainBtnNextBtnNextText
            isActive={contract.selectedTickets.length > 0}>
            계약서 작성
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractTicketScreen;

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
  font-size: 16px;
  color: ${COLORS.sub};
  font-weight: 500;
  line-height: 22.4px;

  ${props =>
    props.isActive &&
    css`
      color: ${COLORS.main};
    `}
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

const EmptyView = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`;
