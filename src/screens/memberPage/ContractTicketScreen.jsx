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
import {ScrollView} from 'react-native';

function ContractTicketScreen(props) {
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

  const [contractList, setContractList] = useState([]);

  const goEditContract = memberId => {
    // if (isActive) {
    //   onPress();
    // }
    navigation.navigate('EditContract', {memberId});
  };

  const getMemberContractTicketListData = async () => {
    try {
      const response = await getMemberContractTicketList({centerId, memberId});
      if (response) {
        setContractList(response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (centerId && memberId) {
      getMemberContractTicketListData();
    }
  }, []);

  useEffect(() => {
    console.log('contract.selectedContractes', contract.selectedContractes);
  }, [contract]);

  // console.log('memberId', memberId, 'centerid', centerId, contractList);

  const onPressContractBtn = item => {
    if (contract.selectedContractes.some(contract => contract.id === item.id)) {
      const updatedContractData = contract.selectedContractes.filter(
        contract => contract.id !== item.id,
      );

      setContract(prev => {
        return {
          ...prev,
          ['selectedContractes']: updatedContractData,
        };
      });
    } else {
      const updatedContractData = [...contract.selectedContractes, item];

      setContract(prev => {
        return {
          ...prev,
          ['selectedContractes']: updatedContractData,
        };
      });
    }
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <Title>이용 중인 이용권 선택</Title>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{marginBottom: 100}}>
        {contractList?.tickets?.map((item, index) => {
          return (
            <ContractCard
              key={item.id}
              isActive={contract.selectedContractes.some(
                contract => contract.id === item.id,
              )}
              onPress={() => onPressContractBtn(item)}>
              <ContractTitle
                isActive={contract.selectedContractes.some(
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

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract.selectedContractes.length > 0}
          onPress={() => goEditContract(memberId)}>
          <BasicMainBtnNextBtnNextText
            isActive={contract.selectedContractes.length > 0}>
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
