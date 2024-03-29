import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import Header from "../../components/header";
import Input from '../../components/input'
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../service'

import {
    Container,
    Content,
    ContainerBtn,
    TextBtn,
    ContainerSearch,
    ContainerList,
    Card,
    CardTitle,
    CardCategoria,
    CardInfo,
    BtnIcon,
    List,
    Image,
    CardName
} from './style'

export default () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(useCallback(() => {
        setLoading(true)
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)

            if (userLogado) {
                const listProducts = await api.get(`/app/product/list?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`)
                setProducts(listProducts.data)
                setList(listProducts.data)
            }
        }
        response()
        setLoading(false)
    }, []))

    useEffect(() => {
        if (search == '') {
            setList(products)
        } else {
            setList(
                products.filter((product) => {
                    if (product.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        return true
                    } else {
                        return false
                    }
                })
            )
        }
    }, [search])

    return (
        <Container>
            <Header nome={"Produtos"} />

            <Content>
                {loading ? <ActivityIndicator color="#008be3" size={30} style={{ marginTop: 10 }} /> :
                    <>
                        <ContainerBtn onPress={() => navigation.navigate("produto-cadastro")}>
                            <TextBtn>Novo produto</TextBtn>
                        </ContainerBtn>

                        <ContainerSearch>
                            <Input onChangeText={t => setSearch(t)}
                                placeholder={"Pesquise pelo nome do produto"} />
                            <AntDesign name="search1" size={24} color="#cacaca" style={{ marginLeft: 10, alignSelf: 'center' }} />
                        </ContainerSearch>

                        <ContainerList>
                            <List
                                showsVerticalScrollIndicator={false}
                                data={list}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) =>
                                    <Card>
                                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                            <CardInfo>
                                                <Image source={{ uri: `${item?.image_url}` }} />
                                                <CardName>
                                                    <CardTitle>{item.name}</CardTitle>
                                                    {item.variations.map(varation =>
                                                        <CardCategoria key={varation.id}>{"R$ " + varation.default_sell_price}</CardCategoria>
                                                    )}

                                                </CardName>

                                            </CardInfo>
                                        </ScrollView>
                                        <BtnIcon onPress={() => navigation.navigate('produto-editar', {
                                            id: item.id
                                        })}>
                                            <AntDesign name="arrowright" size={30} color="#999" style={{ alignSelf: 'center' }} />
                                        </BtnIcon>

                                    </Card>
                                }
                            />

                        </ContainerList>
                    </>
                }

            </Content>
        </Container>
    );
}