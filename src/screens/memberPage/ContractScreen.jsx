import React from 'react';
import {MainContainer} from '../../style/gridStyled'
import GobackGrid from '../../components/grid/GobackGrid';
import { COLORS } from '../../constants/color';
import  styled  from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import {getMemberContractList} from '../../api/memberApi';
import { useRecoilState } from 'recoil';
import { centerIdState } from '../../store/atom';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

function ContractScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();

    const goBack = () => {
        navigation.goBack();
    }


    const {memberId} = route.params;

    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [contractList, setContractList] = useState([]);

    const getMemberContractListData = async () => {
        try{
            const response = await getMemberContractList(centerId);
            if(response){
                setContractList(response);
            }
        }catch(error){
            console.log('error',error)
        }
    }

    const goContractDetail = (id,memberId) => {
        console.log('id',id,memberId)
        console.log('ContractTicket')
        navigation.navigate('ContractTicket',{memberId})
    }

    console.log('나넘어왔냥 ?',memberId)

    useEffect(() => {
        if(centerId){
            getMemberContractListData();
        }
    },[])


    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
            <Title>신규 계약서 선택</Title>
            {
                contractList.map((item,index) => {
                    return(
                        <ContractCard key={index}>
                            <ContractBtnBox onPress={()=>goContractDetail(item.id,memberId)}>
                            <ContractTitle>{item.name}</ContractTitle>
                            </ContractBtnBox>
                        </ContractCard>
                    )
                }
                )
            }
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
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;

const ContractBtnBox = styled.TouchableOpacity`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;