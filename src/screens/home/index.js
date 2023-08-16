import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import ButtonDrawer from '../../components/buttonDrawer'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import {
    Content,
    Header,
    NameUser,
    ContainerDate,
    DateText,
    ImageUser,
    HeaderInfo,
    ContainerImage,
    ContainerCard,
    Card,
    CardVenda,
    CardText,
    CardImage,
    ContainerHeaderInfo
} from './style';

export default () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)
           
        }
        response()
    }, [])

    return (
        <LinearGradient colors={['#008be3', '#b3f4fe']} style={{ flex: 1 }}>
            <Header>
                <HeaderInfo>
                    <ButtonDrawer />

                    <ContainerHeaderInfo>
                        <ScrollView horizontal={true}>
                            <NameUser>{user?.first_name+" "+user?.last_name}</NameUser>
                        </ScrollView>
                        <ContainerDate>
                            <DateText>2023</DateText>
                        </ContainerDate>
                    </ContainerHeaderInfo>

                </HeaderInfo>

                <ContainerImage>
                    <ImageUser source={{ uri: `http://app.contetecnologia.com.br/uploads/business_logos/${user?.business?.logo}` }} />
                </ContainerImage>

            </Header>

            <Content>

                <CardVenda onPress={() => navigation.navigate("venda")}>
                    <MaterialIcons name="point-of-sale" size={40} color={'#008be3'} />
                    <CardText>Vendas</CardText>
                </CardVenda>

                <ContainerCard>
                    <Card onPress={() => navigation.navigate("pessoas")}>
                        <Entypo name="users" size={40} color={'#008be3'} />
                        <CardText>Pessoas</CardText>
                    </Card>

                    <Card onPress={() => navigation.navigate("produto")}>
                        <FontAwesome5 name="box" size={40} color={'#008be3'} />
                        <CardText>Produtos</CardText>
                    </Card>
                </ContainerCard>


            </Content>
        </LinearGradient>
    )
}