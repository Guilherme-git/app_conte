import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import Header from "../../../components/header";
import Label from "../../../components/label";
import Input from '../../../components/input';
import * as ImagePicker from 'expo-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import Divider from 'react-native-divider';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import api from '../../../service'

import {
    Container,
    Content,
    ContainerForm,
    FormControl,
    ContainerBtn,
    TextBtn
} from './style'


export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [user, setUser] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState(null);
    const [ncm, setNcm] = useState(null);
    const [unidades, setUnidades] = useState([]);
    const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [filiais, setFiliais] = useState([]);
    const [filialSelecionada, setFilialSelecionada] = useState(null);
    const [custo, setCusto] = useState(null);
    const [custoOperacional, setCustoOperacional] = useState(null);
    const [lucro, setLucro] = useState(null);
    const [precoVenda, setPrecoVenda] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: '',
        colorButton: ''
    })

    useFocusEffect(useCallback(() => {
        setLoadingScreen(true)
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)

            if (userLogado) {
                const dados = await api.get(`/app/product/view-register-product?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`)
                setMarcas(dados.data.marcas)
                setCategorias(dados.data.categorias)
                setFiliais(dados.data.filiais)
                setUnidades(dados.data.unidade)

                const dados2 = await api.get(`/app/product/show?product=${route.params.id}`)
                setNome(dados2?.data?.name)
                setNcm(dados2?.data?.ncm)
                setUnidadeSelecionada({
                    key: dados2?.data?.unit.id,
                    value: dados2?.data?.unit.actual_name
                });
                setMarcaSelecionada({
                    key: dados2?.data?.brand.id,
                    value: dados2?.data?.brand.name
                })
                setCategoriaSelecionada({
                    key: dados2?.data?.category.id,
                    value: dados2?.data?.category.name
                })
                setFilialSelecionada({
                    key: dados2?.data?.business.id,
                    value: dados2?.data?.business.name
                })

                setCusto(dados2?.data?.variations[0].default_purchase_price)
                setCustoOperacional(dados2?.data?.variations[0].dpp_inc_tax)
                setLucro(dados2?.data?.variations[0].profit_percent)
                setPrecoVenda(dados2?.data?.variations[0].default_sell_price)
            }
        }

        response()
        setLoadingScreen(false)
    }, [route.params.id]));

    const editar = async () => {
        if (camposVazios()) {
            setAlert({
                open: true,
                title: 'Campos vazios',
                message: 'Preencha todas as informações para continuar',
                colorButton: '#DD6B55'
            })

            return
        }
        try {
            setLoading(true)
            const response = await api.put(`/app/product/edit?product=${route.params.id}`, {
                name: nome,
                ncm: ncm,
                unity: typeof unidadeSelecionada == "object" ? unidadeSelecionada.key : unidadeSelecionada,
                brand: typeof marcaSelecionada == "object" ? marcaSelecionada.key : marcaSelecionada,
                categorie: typeof categoriaSelecionada == "object" ? categoriaSelecionada.key : categoriaSelecionada,
                filial: typeof filialSelecionada == "object" ? filialSelecionada.key : filialSelecionada,
                custo: custo,
                custoOperacional: custoOperacional,
                lucro: lucro,
                precoVenda: precoVenda,
            })

            if (response.data.message == "Produto salvo") {
                setAlert({
                    open: true,
                    title: 'Salvo',
                    message: 'Produto salvo com sucesso',
                    colorButton: '#5CB85C'
                })
                navigation.navigate("produto")
            }

        } catch (error) {

            setLoading(false)
        }
        setLoading(false)
    }

    const camposVazios = () => {
        if (!nome || !ncm || !categoriaSelecionada || !unidadeSelecionada || !marcaSelecionada || !filialSelecionada || !custo || !custoOperacional || !lucro || !precoVenda) {
            return true
        }
        return false;
    }

    useEffect(() => {
        if (custoOperacional && lucro) {
            const custos = Number(custo) + Number(custoOperacional);
            setPrecoVenda(String(((Number(custos) * Number(lucro)) / Number(100)) + Number(custos)))
        }

    }, [custo])

    useEffect(() => {
        if (custo && lucro) {
            const custos = Number(custo) + Number(custoOperacional);
            setPrecoVenda(String(((Number(custos) * Number(lucro)) / Number(100)) + Number(custos)))
        }

    }, [custoOperacional])

    useEffect(() => {
        if (custo && custoOperacional) {
            const custos = Number(custo) + Number(custoOperacional);
            setPrecoVenda(String(((Number(custos) * Number(lucro)) / Number(100)) + Number(custos)))
        }

    }, [lucro])

    const dollarMask = createNumberMask({
        delimiter: '',
        separator: '.',
        precision: 2,
    })

    return (
        <Container>
            <Header nome={"Editar produto"} />

            <AwesomeAlert
                show={alert.open}
                title={alert.title}
                message={alert.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor={alert.colorButton}
                onConfirmPressed={() => {
                    setAlert({
                        open: false,
                        title: '',
                        message: ''
                    })

                }}
            />

            <Content>
                {loadingScreen ? <ActivityIndicator color="#008be3" size={30} style={{marginTop:10}} /> :

                    <ScrollView style={{ marginTop: 10, marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                        <ContainerForm>

                            <FormControl>
                                <Label text={"Nome do produto:"} />
                                <Input
                                    value={nome}
                                    onChangeText={t => setNome(t)}
                                    placeholder={"Nome do produto"} />
                            </FormControl>

                            <FormControl>
                                <Label text={"NCM:"} />
                                <Input
                                    value={ncm}
                                    onChangeText={t => setNcm(t)}
                                    placeholder={"Informe o NCM"}
                                    keyboardType={"number-pad"} />
                            </FormControl>

                            <FormControl>
                                <Label text={"Unidade:"} />
                                <SelectList
                                    setSelected={(val) => setUnidadeSelecionada(val)}
                                    data={unidades}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder={unidadeSelecionada?.value ? unidadeSelecionada?.value : "Selecione a unidade"}
                                    searchPlaceholder="Digite a unidade"
                                    save="key"
                                />
                            </FormControl>

                            <FormControl>
                                <Label text={"Marca:"} />
                                <SelectList
                                    setSelected={(val) => setMarcaSelecionada(val)}
                                    data={marcas}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder={marcaSelecionada?.value ? marcaSelecionada?.value : "Selecione a marca"}
                                    searchPlaceholder="Digite a marca"
                                    save="key"
                                />
                            </FormControl>

                            <FormControl>
                                <Label text={"Categoria:"} />
                                <SelectList
                                    setSelected={(val) => setCategoriaSelecionada(val)}
                                    data={categorias}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder={categoriaSelecionada?.value ? categoriaSelecionada?.value : "Selecione a categoria"}
                                    searchPlaceholder="Digite a categoria"
                                    save="key"
                                />
                            </FormControl>

                            <FormControl>
                                <Label text={"Filiais:"} />
                                <SelectList
                                    setSelected={(val) => setFilialSelecionada(val)}
                                    data={filiais}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder={filialSelecionada?.value ? filialSelecionada?.value : "Selecione a filial"}
                                    searchPlaceholder="Digite a filial"
                                    save="key"
                                />
                            </FormControl>

                            <Divider color="#008be3" borderColor="#008be3">Preço de compra padrão</Divider>

                            <FormControl>
                                <Label text={"Custo(R$):"} />
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    mask={dollarMask}
                                    value={custo}
                                    onChangeText={t => setCusto(t)}
                                    keyboardType={"number-pad"} placeholder={"Informe o custo"} />

                            </FormControl>

                            <FormControl>
                                <Label text={"Custo operacional(R$):"} />
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    mask={dollarMask}
                                    value={custoOperacional}
                                    onChangeText={t => setCustoOperacional(t)}
                                    keyboardType={"number-pad"} placeholder={"Informe o custo operacional"} />
                            </FormControl>

                            <FormControl>
                                <Label text={"Lucro(%):"} />
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    value={lucro}
                                    onChangeText={t => setLucro(t)}
                                    keyboardType={"number-pad"} placeholder={"Informe o lucro"} />
                            </FormControl>

                            <FormControl>
                                <Label text={"Preço de venda(R$):"} />
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    value={precoVenda}
                                    onChangeText={t => setPrecoVenda(t)}
                                    placeholder={"Informe o preço de venda"} />
                            </FormControl>



                            <ContainerBtn onPress={editar} disabled={loading ? true : false}>
                                {loading ? <ActivityIndicator color={"#fff"} /> : <TextBtn>Salvar</TextBtn>}

                            </ContainerBtn>


                        </ContainerForm>
                    </ScrollView>
                }
            </Content>


        </Container >
    );
}
