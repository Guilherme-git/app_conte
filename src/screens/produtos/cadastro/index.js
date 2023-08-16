import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import Header from "../../../components/header";
import Label from "../../../components/label";
import Input from '../../../components/input';
import * as ImagePicker from 'expo-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import Divider from 'react-native-divider';
import api from '../../../service'

import {
    Container,
    Content,
    ContainerForm,
    FormControl,
    ContainerBtn,
    TextBtn,
    ContainerBtnImage,
    TextBtnImage,
    ContainerShowImage,
    Image,
    BtnRemoverImage,
    TextBtnRemoverImage
} from './style'


export default () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [nome, setNome] = useState(null);
    const [ncm, setNcm] = useState(null);
    const [codBarras, setCodBarras] = useState(null);
    const [tipoCodBarras, setTipoCodBarras] = useState([
        { key: '1', value: 'Mobiles', disabled: true },
        { value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]);
    const [tipoCodBarrasSelecionado, setTipoCodBarrasSelecionado] = useState(null);
    const [unidades, setUnidades] = useState([]);
    const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    const [subCategorias, setSubCategorias] = useState([
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]);
    const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState(null);
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
            }
        }
        limparCampos();
        response()
        setLoadingScreen(false)
    }, []))

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const cadastrar = async () => {
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
            const response = await api.post('/app/product/create', {
                name: nome,
                ncm: ncm,
                unity: unidadeSelecionada,
                brand: marcaSelecionada,
                categorie: categoriaSelecionada,
                filial: filialSelecionada,
                custo: custo,
                custoOperacional: custoOperacional,
                lucro: lucro,
                precoVenda: precoVenda,
                owner: user.id
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

    const limparCampos = () => {
        setNome(null)
        setNcm(null)
        setUnidadeSelecionada(null)
        setMarcaSelecionada(null)
        setCategoriaSelecionada(null)
        setFiliais(null)
        setCusto(null)
        setCustoOperacional(null)
        setLucro(null)
        setPrecoVenda(null)
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
            <Header nome={"Cadastro de produtos"} />

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
                {loadingScreen ? <ActivityIndicator color="#008be3" size={30} style={{ marginTop: 10 }} /> :
                    <ScrollView style={{ marginTop: 10, marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                        <ContainerForm>

                            {/* <FormControl>
                            <Label text={"Imagem do produto:"} />
                            {image == null ?
                                <ContainerBtnImage onPress={pickImage}>
                                    <TextBtnImage>Escolher imagem</TextBtnImage>
                                </ContainerBtnImage> :
                                <ContainerBtnImage onPress={() => setShowImage(!showImage)}>
                                    <TextBtnImage>Ver imagem selecionada</TextBtnImage>
                                </ContainerBtnImage>
                            }
                        </FormControl>


                        {showImage &&
                            <ContainerShowImage >
                                <Image resizeMode="stretch" source={{ uri: image }} />

                                <BtnRemoverImage onPress={() => (setImage(null), setShowImage(false))}>
                                    <TextBtnRemoverImage>Remover imagem</TextBtnRemoverImage>
                                </BtnRemoverImage>
                            </ContainerShowImage>
                        } */}

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

                            {/* <FormControl>
                            <Label text={"Código de barras:"} />
                            <Input placeholder={"Código de barras"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Tipo de código de barras:"} />
                            <SelectList
                                setSelected={(val) => setTipoCodBarrasSelecionado(val)}
                                data={tipoCodBarras}
                                boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                placeholder="Selecione o tipo"
                                searchPlaceholder="Digite o tipo"
                                save="key"
                            />
                        </FormControl> */}


                            <FormControl>
                                <Label text={"Unidade:"} />
                                <SelectList
                                    setSelected={(val) => setUnidadeSelecionada(val)}
                                    data={unidades}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder="Selecione a unidade"
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
                                    placeholder="Selecione a marca"
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
                                    placeholder="Selecione a categoria"
                                    searchPlaceholder="Digite a categoria"
                                    save="key"
                                />
                            </FormControl>

                            {/* <FormControl>
                            <Label text={"Subcategoria:"} />
                            <SelectList
                                setSelected={(val) => setSubCategoriaSelecionada(val)}
                                data={subCategorias}
                                boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                placeholder="Selecione a subcategoria"
                                searchPlaceholder="Digite a subcategoria"
                                save="key"
                            />
                        </FormControl> */}

                            <FormControl>
                                <Label text={"Filiais:"} />
                                <SelectList
                                    setSelected={(val) => setFilialSelecionada(val)}
                                    data={filiais}
                                    boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                    placeholder="Selecione a filial"
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



                            <ContainerBtn onPress={cadastrar} disabled={loading ? true : false}>
                                {loading ? <ActivityIndicator color={"#fff"} /> : <TextBtn>Salvar</TextBtn>}
                            </ContainerBtn>


                        </ContainerForm>
                    </ScrollView>
                }
            </Content>
        </Container >
    );
}
