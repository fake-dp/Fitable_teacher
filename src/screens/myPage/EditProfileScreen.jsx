import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {MainContainer, GridLine} from '../../style/gridStyled'
import { Text } from 'react-native';
import GobackGrid from '../../components/grid/GobackGrid';
function EditProfileScreen(props) {

    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <MainContainer>
            <GobackGrid onPress={goBack}>프로필 관리</GobackGrid>
        </MainContainer>
    );
}

export default EditProfileScreen;