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
import {getMemberContractTicketList} from '../../api/memberApi';
import { ScrollView } from 'react-native';

function ContractTicketScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const goBack = () => {
        navigation.goBack();
    }

    const {memberId} = route.params;
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [contractList, setContractList] = useState([]);


    const getMemberContractTicketListData = async () => {
        try{
            const response = await getMemberContractTicketList({centerId,memberId});
            if(response){
                setContractList(response);
            }
        }catch(error){
            console.log('error',error)
        }
    }

    useEffect(() => {
        if(centerId && memberId){
            getMemberContractTicketListData();
        }
    }
    ,[])


    console.log('memberId',memberId, 'centerid', centerId,contractList)


    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>계약서 작성</GobackGrid>
            <Title>이용 중인 이용권 선택</Title>
            <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{marginBottom: 50}}
            >
            {
                contractList?.tickets?.map((item,index) => {
                    return(
                        <ContractCard key={item.id}>
                            {/* <ContractBtnBox> */}
                            <ContractTitle>{item.name}</ContractTitle>
                            {/* </ContractBtnBox> */}
                            <DeleteContainer>
                            <ContractTitle>⎯</ContractTitle>
                            </DeleteContainer>
                        </ContractCard>
                    )
                }
                )
            }
            </ScrollView>
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

const ContractCard = styled.View`
background-color: ${COLORS.gray_100};
border-radius: 13px;
padding: 14px 16px;
margin-top: 8px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ContractTitle = styled.Text`
 font-size: 16px;
color: ${COLORS.sub};
font-weight: 500;
line-height: 22.40px;
`;


const DeleteContainer = styled.TouchableOpacity`
width: 28px;
`

{/* <MembersListContaniner>
<MemberName>{member.name}</MemberName>
<DeleteContainer onPress={handleDeleteBtn}>
<MemberName>⎯</MemberName>
</DeleteContainer>
</MembersListContaniner> */}