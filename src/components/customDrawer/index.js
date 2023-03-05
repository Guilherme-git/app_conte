import React from 'react';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import {
    Container,
    Footer,
    ImageUser,
    ContainerInfoUser,
    NomeUser,
    ContainerList,
    BtnSair,
    TextBtnSair,
    TextVersao
} from './style'

export default (props) => {
;    const navigation = useNavigation();

    return (
        <Container>

            <DrawerContentScrollView {...props}>

                <ContainerInfoUser>
                    <ImageUser resizeMode='contain' source={{ uri: 'http://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg' }} />
                    <NomeUser>Conte tecnologia</NomeUser>
                </ContainerInfoUser>

                <ContainerList>
                    <DrawerItemList {...props} />
                </ContainerList>

            </DrawerContentScrollView>

            <Footer>
                <BtnSair onPress={() => (navigation.dispatch(DrawerActions.closeDrawer()),navigation.navigate('login') )}>
                    <AntDesign name="logout" size={18} color="#7E1A1E" />
                    <TextBtnSair>Sair</TextBtnSair>
                </BtnSair>

                <TextVersao>1.0</TextVersao>
            </Footer>
        </Container>

    );
}