import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getMemberCoupons} from '../../api/memberApi';
import FastImage from 'react-native-fast-image';
function PaymentGridCard({setFormData,type,index,timeAndPeriod}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/caretdownblack.png');
    const [timeAndPeriodStr, setTimeAndPeriodStr] = useState(String(timeAndPeriod));
    const [centerId, setCenterId] = useRecoilState(centerIdState);

    useEffect(() => {
    setTimeAndPeriodStr(String(timeAndPeriod));
}, [timeAndPeriod]);


    const pickerRef = useRef();
    const couponRef = useRef();
    const openPicker = () => {
        pickerRef.current?.togglePicker(true);
      };

    const openCouponPicker = () => {
        couponRef.current?.togglePicker(true);
    };


    const getCouponList = async () => {
        const {data} = await getMemberCoupons(centerId, memberId);
        console.log('data',data);
    }
    

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
    ]

    return (
        <>
        {
        // type && type && (
        //     <Container>
        //     <InfoTitleText>쿠폰(선택)</InfoTitleText>
        //     <SelectBox onPress={openCouponPicker}>
        //             <RNPickerSelect
        //               ref={couponRef}
        //                 doneText="변경"
        //                 onValueChange={(value)=>console.log('value',value)}
        //                 items={paymentTypeItem}
        //                 placeholder={{
                     
        //                 }}
        //                 style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
        //         <RigthIcon source={rightIcon}/>
        //      </SelectBox>
        // </Container>
        // )
        }

        <Container>
            <InfoTitleText>결제수단</InfoTitleText>
            <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                        ref={pickerRef}
                        doneText="변경"
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].paymentType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={paymentTypeItem}
                        placeholder={{
                            label: '결제수단을 선택해주세요',
                            value: null,
                        }}
                        style={{ inputIOS: { color: 'black' }, inputAndroid: { color: 'black' } }}/>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
        </Container>

        <Container>
            <PriceContainer
                paylink={type === 'paylink' ? true : false}
            >

             <PriceInnerContainer paylink={type === 'paylink' ? true : false}>
            <InfoTitleText>상품 가격</InfoTitleText>
            <PriceTextInput 
            value={timeAndPeriodStr}
            disabled={true}
            />
            </PriceInnerContainer>           

            <PriceInnerContainer>
            <InfoTitleText>판매 금액</InfoTitleText>
            <PriceTextInput 
            placeholder="0원" keyboardType="number-pad" 
            onChangeText={(text) => {
                setFormData((prevData) => {
                    let tickets = [...prevData.tickets];
                    tickets[index].salePrice = text;
                    return {...prevData, tickets};
                });
            }}
            />
            </PriceInnerContainer>

{
    type === 'paylink' ? (
        null
    ):(
        <PriceInnerContainer>
        <InfoTitleText>받은 금액</InfoTitleText>
        <PriceTextInput 
        placeholder="0원" keyboardType="number-pad" 
        onChangeText={(text) => {
            setFormData((prevData) => {
                let tickets = [...prevData.tickets];
                tickets[index].receivedPrice = text;
                return {...prevData, tickets};
            });
        }}

        />
        </PriceInnerContainer>
    )
}
           
            </PriceContainer>
        </Container>
    
        </>
    );
}

export default PaymentGridCard;


const Container = styled.View`
margin-bottom: 26px;
`

const InfoTitleText = styled.Text`
color: ${COLORS.gray_400};
 font-size: 14px;
 font-family: Pretendard;
 font-weight: 500;
 line-height: 22px;
 margin-bottom: 8px;
`;

const SelectBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${COLORS.gray_100};
    border-radius: 13px;
    padding: 15px 16px;
    background-color: ${COLORS.gray_100};
`

const PriceContainer = styled.View`
    flex-direction: row;
    justify-content: ${props => props.paylink ? '' : 'space-between'};

`

const PriceInnerContainer = styled.View`
    flex-direction: column;
    width: 32%;
    margin-right: ${props => props.paylink ? '8px' : ''};
`

const RigthIcon = styled(FastImage)`
width: 16px;
height: 16px;
`

const PriceTextInput = styled.TextInput.attrs(props => ({
    editable: !props.disabled,
    placeholderTextColor: props.disabled ? COLORS.sub : COLORS.gray_300,
  }))`
      font-size: 14px;
      color: ${COLORS.gray_300};
      font-weight: 400;
      border: 1px solid ${COLORS.gray_100};
      background-color: ${COLORS.gray_100};
      border-radius: 13px;
      padding: 15px 16px;
      margin-bottom: 8px;
      text-align: right;
  `
  