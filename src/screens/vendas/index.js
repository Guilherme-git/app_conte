import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, ActivityIndicator, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import Header from "../../components/header";
import Input from '../../components/input'
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../service'
import moment from "moment/moment";
import AwesomeAlert from 'react-native-awesome-alerts';
import {shareAsync} from 'expo-sharing';
import * as FileSystem from 'expo-file-system'

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
    CardName,
    CardTextSub
} from './style'

export default () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [vendas, setVendas] = useState([]);
    const [list, setList] = useState([]);
    const [transaction, setTransaction] = useState({})
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: '',
        colorButton: ''
    })

    useFocusEffect(useCallback(() => {
        setLoading(true)
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)

            if (userLogado) {
                const listVendas = await api.get(`/app/sell/my-sell?business_id=1d=${userLogado.business.id}`)
                setVendas(listVendas.data)
                setList(listVendas.data)
            }
        }
        response()
        setLoading(false)
    }, []))

    useEffect(() => {
        if (search == '') {
            setList(vendas)
        } else {
            setList(
                vendas.filter((venda) => {
                    if (venda.contact?.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                        return true
                    } else {
                        return false
                    }
                })
            )
        }
    }, [search])

    const baixarCupom = async () => {
        setAlert({
            open: false,
            title: '',
            message: ''
        })
        Linking.openURL(`https://app.contetecnologia.com.br/public/api/app/sell/cupom?id=${transaction.id}&business_id=${transaction.business_id}`)
    }

    const compartilhar = async () => {
        const filename = "Comprovante.pdf";
        const result = await FileSystem.downloadAsync(`https://app.contetecnologia.com.br/public/api/app/sell/cupom?id=${transaction.id}&business_id=${transaction.business_id}`, FileSystem.documentDirectory + filename)
        shareAsync(result.uri)
    }

    {console.log()}

    return (
        <Container>
            <Header nome={"Vendas"} />

            <Content>
                {loading ? <ActivityIndicator color="#008be3" size={30} style={{ marginTop: 10 }} /> :
                    <>
                        <AwesomeAlert
                            show={alert.open}
                            title={alert.title}
                            message={alert.message}
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="Baixar comprovante"
                            confirmText="Compartilhar"
                            confirmButtonColor="#DD6B55"
                            cancelButtonColor="#DD6B55"
                            onCancelPressed={baixarCupom}
                            onConfirmPressed={compartilhar}
                        />
                        <ContainerBtn onPress={() => navigation.navigate("venda-cadastro")}>
                            <TextBtn>Nova venda</TextBtn>
                        </ContainerBtn>

                        <ContainerSearch>
                            <Input onChangeText={t => setSearch(t)}
                                placeholder={"Pesquise pelo nome do cliente"} />
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
                                                <CardName>
                                                    <CardTitle>{item.contact?.name}</CardTitle>
                                                    <CardTextSub>{moment(item.transaction_date).format("DD/MM/YYYY HH:mm")}</CardTextSub>
                                                </CardName>

                                            </CardInfo>
                                        </ScrollView>
                                        {/* <BtnIcon onPress={() => navigation.navigate('venda-editar', {
                                            produto_carrinho: item
                                        })}>
                                            <AntDesign name="arrowright" size={30} color="#999" style={{ alignSelf: 'center' }} />
                                        </BtnIcon> */}
                                        <BtnIcon onPress={() => {
                                            setAlert({
                                                open: true
                                            }),
                                            setTransaction(item)
                                        } }>
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