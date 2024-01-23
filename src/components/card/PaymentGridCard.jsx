import styled from 'styled-components/native';
import { COLORS } from '../../constants/color'; 
import { useState ,useRef, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { centerIdState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import {getMemberCoupons} from '../../api/memberApi';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';
function PaymentGridCard({setFormData,type,index,timeAndPeriod,memberId}) {
    // const {startDate=""}=state ||{};
    const rightIcon = require('../../assets/img/caretdownblack.png');
    const [timeAndPeriodStr, setTimeAndPeriodStr] = useState(String(timeAndPeriod));
    const [centerId, setCenterId] = useRecoilState(centerIdState);
    const [couponList, setCouponList] = useState([]);
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


    const getCouponList = async (id, memberId) => {
        try{
            const response = await getMemberCoupons({id, memberId});
            console.log('response@@!@#1', response.coupons)
            if(response && response.coupons && response.coupons.length > 0){
                setCouponList(response.coupons);
            }
        }catch(error){
            console.log('error@@', error)
        }
    }
    

const transformedCouponTickets = couponList && couponList.length > 0 ? couponList.map((ticket) => ({
    label: ticket?.centerName,
    value: ticket?.id,
})) : [];



useEffect(() => {
    if(type === 'paylink' && centerId && memberId){
        getCouponList(centerId, memberId);
    }
}, [centerId, memberId,type])


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
        type && type && (
            <Container>
            <InfoTitleText>쿠폰(선택)</InfoTitleText>
            {
                Platform.OS === 'ios' ? (
                    <SelectBox onPress={openCouponPicker}>
                    <RNPickerSelect
                        ref={couponRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        onValueChange={(value) => {
                            if (value !== undefined) {
                                setFormData((prevData) => {
                                    let tickets = [...prevData.tickets];
                                    tickets[index].couponId = value;
                                    return {...prevData, tickets};
                                });
                            }
                        }}
                        items={transformedCouponTickets}
                        placeholder={{
                            label: '쿠폰을 선택해주세요',
                            
                        }}
                        style={{ inputIOS: { color: 'black' }, 
                        inputAndroid: {
                            color: 'black',
                            height: 20,
                            padding:0,
                            margin:0,
                             } }}/>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
                ):(
                    <RNPickerSelect
                        ref={couponRef}
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                      useNativeAndroidPickerStyle={false}
                      fixAndroidTouchableBug={true}
                        doneText="변경"
                        onValueChange={(value) => {
                            if (value !== undefined) {
                                setFormData((prevData) => {
                                    let tickets = [...prevData.tickets];
                                    tickets[index].couponId = value;
                                    return {...prevData, tickets};
                                });
                            }
                        }}
                        items={transformedCouponTickets}
                        placeholder={{
                            label: '쿠폰을 선택해주세요',
                            
                        }}
                        Icon={() => {
                            return <RigthIcon source={rightIcon}/>;
                            }
                          }
                          style={
                            { 
                          inputAndroid: 
                          {  
                          fontSize: 16,
                          height: 60, 
                          width:350, 
                          color: '#000000',
                          borderColor: COLORS.gray_100, 
                          backgroundColor: COLORS.gray_100,
                          borderWidth: 1, 
                          borderRadius: 12,
                          padding: 10
                          }, 
                          iconContainer: {
                            top: 24,
                            right: 12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}
                          
                             />
                )
            }
            
        </Container>
        )
        }

        <Container>
            <InfoTitleText>결제수단</InfoTitleText>
            {
                 Platform.OS === 'ios' ? (
                    <SelectBox onPress={openPicker}>
                    <RNPickerSelect
                        ref={pickerRef}
                        doneText="변경"
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        disabled={type === 'paylink' ? true : false}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].paymentType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={paymentTypeItem}
                        placeholder={{
                            label: type === 'paylink' ? '결제링크' : '결제수단을 선택해주세요',
                            value: null,
                        }}
                        style={{ inputIOS: { color: 'black' }, 
                        inputAndroid: { 
                            color: 'black',
                            height: 20,
                            padding:0,
                            margin:0,
                            } }}/>
                <RigthIcon source={rightIcon}/>
             </SelectBox>
                 ):(
                   
                    <RNPickerSelect
                        ref={pickerRef}
                        doneText="변경"
                        textInputProps={{ underlineColorAndroid: 'transparent'}}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                        disabled={type === 'paylink' ? true : false}
                        onValueChange={(value) => {
                            setFormData((prevData) => {
                                let tickets = [...prevData.tickets];
                                tickets[index].paymentType = value;
                                return {...prevData, tickets};
                            });
                        }}
                        items={paymentTypeItem}
                        placeholder={{
                            label: type === 'paylink' ? '결제링크' : '결제수단을 선택해주세요',
                            value: null,
                        }}
                        Icon={() => {
                            return <RigthIcon source={rightIcon}/>;
                            }
                          }
                          style={
                            { 
                          inputAndroid: 
                          {  
                          fontSize: 16,
                          height: 60, 
                          width:350, 
                          color: '#000000',
                          borderColor: COLORS.gray_100, 
                          backgroundColor: COLORS.gray_100,
                          borderWidth: 1, 
                          borderRadius: 12,
                          padding: 10
                          }, 
                          iconContainer: {
                            top: 24,
                            right: 12,
                          },
                          placeholder: { 
                            color: COLORS.sub
                             }
                          }}/>
              
                 )
            }
           
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
  