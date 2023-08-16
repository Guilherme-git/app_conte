import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)
            if (userLogado == null) {
                navigation.navigate("login")
            }
        }
        response()
    }, [])

    const deslogar = async () => {
        await AsyncStorage.removeItem("@app_conte")
        navigation.dispatch(DrawerActions.closeDrawer()), navigation.navigate('login')
    }

    return (
        <Container>

            <DrawerContentScrollView {...props}>

                <ContainerInfoUser>
                    <ImageUser resizeMode='contain' source={{ uri: `http://app.contetecnologia.com.br/uploads/business_logos/${user?.business?.logo}` }} />
                    <NomeUser>{user?.first_name+" "+user?.last_name}</NomeUser>
                </ContainerInfoUser>

                <ContainerList>
                    <DrawerItemList {...props} />
                </ContainerList>

            </DrawerContentScrollView>

            <Footer>
                <BtnSair onPress={deslogar}>
                    <AntDesign name="logout" size={18} color="#7E1A1E" />
                    <TextBtnSair>Sair</TextBtnSair>
                </BtnSair>

                <TextVersao>1.0</TextVersao>
            </Footer>
        </Container>

    );
}