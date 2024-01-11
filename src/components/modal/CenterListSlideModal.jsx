import { styled } from 'styled-components/native';
import { COLORS } from '../../constants/color';
import { Modal, ScrollView,} from 'react-native';
import FastImage from 'react-native-fast-image';
function CenterListSlideModal({modalVisible, closeModal,centerList ,text, onPress}) {

    // console.log('centerList',centerList)

    return (
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalContent>
          <ModalCloseButton onPress={closeModal}>
            <ModalCloseBox source={require('../../assets/img/close.png')} />
           </ModalCloseButton>
           <ModalTitle>{text}</ModalTitle>
           <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
           >
           {
            centerList && centerList.map(center => (
                <CenterListContaniner key={center.id} onPress={()=>onPress(center.id, center.name)}>
                <ModalSubTitle>{center.name}</ModalSubTitle>
                </CenterListContaniner>
            ))
           }
           </ScrollView>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
}

export default CenterListSlideModal;



const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
`;

const ModalContent = styled.View`
background-color: ${COLORS.white};
width: 100%;
padding: 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
flex: .45;
`;

const ModalTitle = styled.Text`
    margin-top: 100px;
    margin-bottom: 43px;
  font-size: 28px;
font-weight: 500;
line-height: 37.80px;
color: ${COLORS.sub};

`;

const ModalSubTitle = styled.Text`
font-size: 16px;
font-weight: 500;
line-height: 22.40px;
color: ${COLORS.main};
`;

const ModalCloseButton = styled.TouchableOpacity`
`;

const ModalCloseBox = styled(FastImage)`
    position: absolute;
    right: 15px;
    top: 15px;
    width: 28px;
    height: 28px;
`

const CenterListContaniner = styled.TouchableOpacity`
margin-bottom: 20px;
justify-content: center;
align-items: center;
border: 1px solid ${COLORS.sub};
padding: 10px 20px;
border-radius: 50px;
background-color: ${COLORS.sub};
`