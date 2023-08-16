import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from 'react-native-select-dropdown'
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign, FontAwesome, EvilIcons } from '@expo/vector-icons';
import Header from "../../components/header";
import Input from '../../components/input'
import api from '../../service'

import {
    Container,
    Content,
    ContainerBtn,
    TextBtn,
    ContainerFilter,
    ContainerSearch,
    ContainerList,
    Card,
    CardTitle,
    CardCpfCnpj,
    CardInfo,
    BtnIcon,
    List
} from './style'

export default () => {
    const countries = ["Pessoa juridica", "Pessoa fisica"]
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [pessoas, setPessoas] = useState([]);
    const [list, setList] = useState([]);

    useFocusEffect(useCallback(() => {
        setLoading(true)
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)

            if (userLogado) {
                const listPessoas = await api.get(`/app/contact/list?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`)
                setPessoas(listPessoas.data)
                setList(listPessoas.data)
            }
        }
        response()
        setLoading(false)
    }, []))

    useEffect(() => {
        if (search == '') {
            setList(pessoas)

        } else {
            setList(
                pessoas.filter((pessoa) => {
                    if (pessoa.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
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
            <Header nome={"Pessoas"} />

            <Content>
                {loading ? <ActivityIndicator color="#008be3" size={30} style={{ marginTop: 10 }} /> :
                    <>
                        <ContainerBtn onPress={() => navigation.navigate("pessoa-cadastro")}>
                            <TextBtn>Nova pessoa</TextBtn>
                        </ContainerBtn>


                        <ContainerSearch>
                            <Input onChangeText={t => setSearch(t)}
                                placeholder={"Pesquise pelo nome da pessoa"} />
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
                                                <CardTitle>{item.name}</CardTitle>
                                                <CardCpfCnpj>{item.cpf_cnpj}</CardCpfCnpj>
                                            </CardInfo>
                                        </ScrollView>
                                        <BtnIcon onPress={() => navigation.navigate('pessoa-editar', {
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