import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import ButtonDrawer from '../../components/buttonDrawer'
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

    return (
        <LinearGradient colors={['#008be3', '#b3f4fe']} style={{ flex: 1 }}>
            <Header>
                <HeaderInfo>
                    <ButtonDrawer />

                    <ContainerHeaderInfo>
                        <ScrollView horizontal={true}>
                            <NameUser>Conte tecnologia</NameUser>
                        </ScrollView>
                        <ContainerDate>
                            <DateText>2023</DateText>
                        </ContainerDate>
                    </ContainerHeaderInfo>

                </HeaderInfo>

                <ContainerImage>
                    <ImageUser source={{ uri: 'http://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg' }} />
                </ContainerImage>
            </Header>

            <Content>

                <CardVenda onPress={() => navigation.navigate("venda")}>
                    <MaterialIcons name="point-of-sale" size={40} color={'#008be3'} />
                    <CardText>Vendas</CardText>
                </CardVenda>

                <ContainerCard>
                    <Card onPress={() => navigation.navigate("cliente")}>
                        <Entypo name="users" size={40} color={'#008be3'} />
                        <CardText>Clientes</CardText>
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