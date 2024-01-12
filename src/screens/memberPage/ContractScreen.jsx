import React from 'react';
import {MainContainer} from '../../style/gridStyled';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {getMemberContractList} from '../../api/memberApi';
import {useRecoilState} from 'recoil';
import {centerIdState, contractState} from '../../store/atom';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

function ContractScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const [contract, setContract] = useRecoilState(contractState);

  const goBack = () => {
    navigation.goBack();
  };

  // route.params.memberId = `0bb89eca-16e4-43f5-b3f3-0dcbdb488bd6`;
  // const {memberId} = route.params;

  const memberId = `0bb89eca-16e4-43f5-b3f3-0dcbdb488bd6`;

  console.log('memberId  @@@@@@@', memberId);

  // const [centerId, setCenterId] = useRecoilState(centerIdState);
  const centerId = `18c09191-e393-4f0d-80cf-b0eff1348e3d`;

  const [contractList, setContractList] = useState([]);

  const updateClassTime = (id, startTime, endTime) => {
    const updatedClassTimes = classTimes.map(classTime => {
      if (classTime.id === id) {
        return {
          ...classTime,
          startTime,
          endTime,
          dayOfWeek: dayToEnglish(classTime.dayIndex),
        };
      }
      return classTime;
    });
    setClassTimes(updatedClassTimes);
    // 상위 컴포넌트에 있는 schedules 상태를 업데이트
    setSchedules(
      updatedClassTimes.map(ct => ({
        dayOfWeek: ct.dayOfWeek,
        startTime: ct.startTime,
        endTime: ct.endTime,
      })),
    );
  };

  const getMemberContractListData = async () => {
    try {
      const response = await getMemberContractList(centerId);
      if (response) {
        setContractList(response);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const goContractDetail = memberId => {
    console.log('ContractTicket');

    // if (isActive) {
    //   onPress();
    // }
    navigation.navigate('ContractTicket', {memberId});
  };

  useEffect(() => {
    getMemberContractListData();
    console.log('contract.contractTemplate.id', contract.contractTemplate.id);
  }, []);

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
      <Title>신규 계약서 선택</Title>
      {contractList.map((item, index) => {
        return (
          <ContractCard key={index}>
            <ContractBtnBox
              isActive={contract.contractTemplate.id === item.id}
              onPress={() =>
                setContract(prev => {
                  return {
                    ...prev,
                    ['contractTemplate']: item,
                  };
                })
              }>
              <ContractTitle
                isActive={contract.contractTemplate.id === item.id}>
                {item.name}
              </ContractTitle>
            </ContractBtnBox>
          </ContractCard>
        );
      })}

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={contract?.contractTemplate?.id}
          onPress={() => goContractDetail(memberId)}>
          <BasicMainBtnNextBtnNextText
            isActive={contract?.contractTemplate?.id}>
            이용권 선택
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default ContractScreen;

const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.35px;
  color: ${COLORS.gray_400};
  margin-bottom: 10px;
`;

const ContractCard = styled.View`
  border-radius: 10px;
  background-color: ${COLORS.white};
  margin-top: 8px;
`;

const ContractTitle = styled.Text`
  font-size: 16px;
  color: ${props => (props.isActive ? COLORS.main : COLORS.sub)};
  font-weight: 500;
  line-height: 22.4px;
`;

const ContractBtnBox = styled.TouchableOpacity`
  background-color: ${props => (props.isActive ? COLORS.sub : COLORS.gray_100)};

  /* background-color: ${COLORS.gray_100}; */
  border-radius: 13px;
  padding: 14px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
