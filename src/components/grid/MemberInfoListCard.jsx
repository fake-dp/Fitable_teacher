import React from 'react';
import MemberInfoCard from '../card/MemberInfoCard';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

function MemberInfoListCard({ userList, type }) {
    return (
        <ListContainer>
            <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}>
                {userList.map(user => (
                <MemberInfoCard key={user.id} userInfo={user} type={type} />
                ))}
            </ScrollView>
        </ListContainer>
    );
}

export default MemberInfoListCard;

const ListContainer = styled.View`
    flex:1;
`;
