import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import ButtonDrawer from '../../components/buttonDrawer'
import { FontAwesome5 } from '@expo/vector-icons';

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

                <CardVenda>
                    <CardImage source={require('../../assets/icon_add_venda.png')} />
                    <CardText>Vendas</CardText>
                </CardVenda>

                <ContainerCard>
                    <Card>
                        <CardImage source={require('../../assets/icon_add_user.png')} />
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