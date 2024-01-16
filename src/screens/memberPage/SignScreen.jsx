import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import styled from 'styled-components/native';
import GobackGrid from '../../components/grid/GobackGrid';
import {COLORS} from '../../constants/color';
import {contractState} from '../../store/atom';
import {MainContainer} from '../../style/gridStyled';

import {useRoute} from '@react-navigation/native';

import SignatureScreen from 'react-native-signature-canvas';

const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

const removeImage = require('../../assets/img/eraser-1.png');

function SignScreen(props) {
  const navigation = useNavigation();

  const ref = useRef();

  const route = useRoute();

  const {currentView} = route.params;

  const [isSignEnd, setIsSignEnd] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const [contract, setContract] = useRecoilState(contractState);

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleOK = async signature => {
    setContract(prev => {
      return {
        ...prev,
        [currentView]: signature,
      };
    });
    navigation.goBack();
  };

  const onSignRegisterButton = async () => {
    await ref.current.readSignature();
  };

  return (
    <MainContainer>
      <GobackGrid onPress={goBack}>서명하기</GobackGrid>

      <View style={{flex: 1}}>
        <SignatureScreen
          onOK={handleOK}
          onEnd={() => setIsSignEnd(true)}
          ref={ref}
          webStyle={style}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: 12,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
            }}
            title="Clear"
            onPress={handleClear}>
            <RemoveIcon source={removeImage} />
            <RemoveText>모두 지우기</RemoveText>
          </TouchableOpacity>
        </View>
      </View>

      <BasicMainBtnContainer>
        <BasicMainBtnNextBtn
          isActive={isSignEnd}
          onPress={() => onSignRegisterButton()}>
          <BasicMainBtnNextBtnNextText isActive={isSignEnd}>
            서명등록
          </BasicMainBtnNextBtnNextText>
        </BasicMainBtnNextBtn>
      </BasicMainBtnContainer>
    </MainContainer>
  );
}

export default SignScreen;

const BasicMainBtnContainer = styled.View`
  position: absolute;
  bottom: 0px;
  left: 20px;
  right: 20px;
  height: 80px;
  background-color: ${COLORS.white};
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

const RemoveIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

const RemoveText = styled.Text`
  color: ${COLORS.sub};
  font-size: 14px;
  font-weight: 500;
  line-height: 21.4px;
`;
