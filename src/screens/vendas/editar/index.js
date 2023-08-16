import React, { useState, useCallback, useEffect } from "react";
import { Image, ScrollView, ActivityIndicator, View } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import Header from "../../../components/header";
import Input from "../../../components/input";
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import Dialog from "react-native-dialog";
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../../service'
import Modal from "react-native-modal";

import {
    Container,
    Content,
    ContainerBtn,
    TextBtn,
    ContainerProdutos,
    ContainerSearch,
    ContainerCategoria,
    CardProduto,
    CardProdutoName,
    CardProdutoValor,
    CardProdutoImage,
    List,
    ContainerCardProduto,
    Divider,
    ContainerFiltro,
    ContainerScreens,
    ScreensProduto,
    ScreensResumo,
    ScreensText,
    BtnPagamento,
    BtnPagamentoText,
    ContentDescription,
    ContentDescriptionText,
    ContentDescriptionHeader,
    ContentDescriptionBody,
    ContentDescriptionBodyText,
    ContentDescriptionListProduct,
    ContentDescriptionListProductText,
    ContainerFormaPagamento,
    ContainerFormaPagamentoTipos,
    ContainerFormaPagamentoCardText,
    ContainerFormaPagamentoCard,
    TotalScreenResumo,
    TotalScreenResumoText,
    ContentDescriptionModal,
} from './style'

export default () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingPagamento, setLoadingPagamento] = useState(false);
    const [modalConfirmarPagamento, setModalConfirmarPagamento] = useState(false);
    const [search, setSearch] = useState('');
    const [searchCategoria, setSearchCategoria] = useState({});
    const [screensProdutos, setScreensProdutos] = useState(true);
    const [screensResumo, setScreensResumo] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState("cash");
    const [desconto, setDesconto] = useState();
    const [descontoDialog, setDescontoDialog] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [products, setProducts] = useState([]);
    const [list, setList] = useState([]);
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);
    const [totalCarrinho, setTotalCarrinho] = useState(0);
    const [totalCarrinhoDesconto, setTotalCarrinhoDesconto] = useState(0);

    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: '',
        colorButton: ''
    })

    const dollarMask = createNumberMask({
        delimiter: '',
        separator: '.',
        precision: 2,
    })

    useFocusEffect(useCallback(() => {
        setLoading(true)
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)

            if (userLogado) {
                const listProducts = await api.get(`/app/product/list?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`)
                setProducts(listProducts.data)
                setList(listProducts.data)

                const dados = await api.get(`/app/product/view-register-product?business_id=${userLogado.business.id}&owner_id=${userLogado.id}`)
                setCategorias(dados.data.categorias)

                const produtos = [];

                route.params.produto_carrinho.sell_lines.map(item => {
                    produtos.push({
                        id: item.product.id,
                        nome: item.product.name,
                        preco: Number(item.product.variations[0].sell_price_inc_tax),
                        quantidade: Number(item.quantity)
                    })
    
                })

                setTotalCarrinho((Math.round(route.params.produto_carrinho.final_total * 100) / 100).toFixed(2)  )
                setTotalCarrinhoDesconto((Math.round(route.params.produto_carrinho.final_total * 100) / 100).toFixed(2))
                setProdutosCarrinho(produtos)
            }
        }
        response()
        setLoading(false)
    }, [route.params.produto_carrinho]))

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

    useEffect(() => {
        if (searchCategoria == '') {
            setList(products)
        } else {
            setList(
                products.filter((product) => {
                    if (product.category_id == searchCategoria) {
                        return true
                    } else {
                        return false
                    }
                })
            )
        }

    }, [searchCategoria])

    const addProduto = (id, nome, preco) => {
        const index = produtosCarrinho.findIndex(item => item.id == id)

        if (index == -1) {
            setProdutosCarrinho([...produtosCarrinho, { id: id, nome: nome, preco: preco, quantidade: 1 }])
            const total = Number(totalCarrinho) + Number(preco);
            setTotalCarrinho(total)
            setTotalCarrinhoDesconto(total)
        } else {
            const array_item = produtosCarrinho[index];
            const array_sup = [...produtosCarrinho]
            array_sup.splice(index, 1)

            array_sup.push({
                id: array_item['id'],
                nome: array_item['nome'],
                preco: array_item['preco'],
                quantidade: Number(array_item['quantidade']) + Number(1)
            })

            const total = Number(totalCarrinho) + Number(array_item['preco']);

            setTotalCarrinho(total)
            setTotalCarrinhoDesconto(total)
            setProdutosCarrinho(array_sup)
        }

    }

    const removerProduto = (item) => {
        const index = produtosCarrinho.findIndex(produto => produto.id == item.id)
        const array_sup = [...produtosCarrinho]
        array_sup.splice(index, 1)

        const totalDesconto = Number(totalCarrinhoDesconto) - (Number(item.preco) * Number(item.quantidade));
        setTotalCarrinho(totalDesconto)
        setTotalCarrinhoDesconto(totalDesconto)
        setProdutosCarrinho(array_sup)
    }

    const aplicarDesconto = () => {
        const total = Number(totalCarrinhoDesconto) - Number(desconto);
        if (!desconto) {
            setDescontoDialog(false)
            return setTotalCarrinhoDesconto(totalCarrinho)
        }
        if (total < 0) {
            setDescontoDialog(false)
            return setTotalCarrinhoDesconto(0)
        }
        setTotalCarrinhoDesconto(total)
        setDescontoDialog(false)
    }

    const removerDesconto = () => {
        setTotalCarrinhoDesconto(totalCarrinho)
        setDescontoDialog(false)
        setDesconto(null)
    }

    const abrirModalConfirmaPagamento = () => {
        if (produtosCarrinho.length > 0) {
            setDesconto(null)
            setModalConfirmarPagamento(true)
        } else {
            setAlert({
                open: true,
                title: "Nenhum produto",
                message: "Adicione pelo menos um produto no carrinho",
                colorButton: 'red'
            })

        }
    }

    const fecharModalConfirmaPagamento = () => {
        setDesconto(null)
        setTotalCarrinhoDesconto(totalCarrinho)
        setModalConfirmarPagamento(false)
    }

    const pagamento = async () => {
        
        try {
            setLoadingPagamento(true)
            const response = await api.post( `/app/sell/edit?transaction=${route.params.produto_carrinho.id}&business_id=${user.business.id}`, {

                total: totalCarrinhoDesconto,
                metodoPagamento,
                produtos: produtosCarrinho,
                user
            })
    
            if (response.data.message == 'Venda editada') {
                setAlert({
                    open: true,
                    title: 'Editada',
                    message: 'Venda editada com sucesso',
                    colorButton: '#5CB85C'
                })
            }
            fecharModalConfirmaPagamento()
            setLoadingPagamento(false)
        } catch (error) {
            setAlert({
                open: true,
                title: 'Ocorreu um erro',
                message: 'Ocorreu um problema, tente novamente mais tarde!',
                colorButton: '#DD6B55'
            })
            setLoadingPagamento(false)
        }
    }

    return (
        <Container>
            <Header nome={"Editar venda"} />

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
                {loading ? <ActivityIndicator color="#008be3" size={30} style={{ marginTop: 10 }} /> :
                    <>
                        <ContainerScreens>
                            <ScreensProduto
                                status={screensProdutos ? true : false}
                                onPress={() => (setScreensProdutos(true), setScreensResumo(false))}>
                                <ScreensText>Produtos</ScreensText>
                            </ScreensProduto>

                            <ScreensResumo
                                status={screensResumo ? true : false}
                                onPress={() => (setScreensResumo(true), setScreensProdutos(false))}>
                                {produtosCarrinho.length > 0 &&
                                    <TotalScreenResumo>
                                        <TotalScreenResumoText>{produtosCarrinho.length}</TotalScreenResumoText>
                                    </TotalScreenResumo>
                                }
                                <ScreensText>Resumo</ScreensText>
                            </ScreensResumo>
                        </ContainerScreens>

                        {screensProdutos &&
                            <ContainerProdutos>
                                <ContainerFiltro>
                                    <ContainerSearch>
                                        <Input onChangeText={t => setSearch(t)}
                                            value={search}
                                            placeholder={"Busque um produto"} />
                                        <AntDesign name="search1" size={24} color="#cacaca" style={{ marginLeft: 10, alignSelf: 'center' }} />
                                    </ContainerSearch>

                                    <ContainerCategoria>
                                        <SelectList
                                            setSelected={(val) => setSearchCategoria(val)}
                                            data={categorias}
                                            boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                                            placeholder={"Filtre pela categoria"}
                                            searchPlaceholder="Digite a categoria"
                                            save="key"
                                        />
                                    </ContainerCategoria>

                                    <Divider />
                                </ContainerFiltro>

                                <List
                                    showsVerticalScrollIndicator={false}
                                    numColumns={2}
                                    data={list}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item, index }) =>
                                        <ContainerCardProduto key={item.id}>
                                            <CardProduto onPress={() => addProduto(item.id, item.name, item.variations[0].sell_price_inc_tax)} >
                                                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                                    <CardProdutoImage source={{ uri: item.image_url }} />
                                                    <CardProdutoName>{item.name}</CardProdutoName>
                                                    {item.variations[0] != undefined &&
                                                        <CardProdutoValor>R$ {item.variations[0].sell_price_inc_tax}</CardProdutoValor>
                                                    }
                                                </ScrollView>
                                            </CardProduto>
                                        </ContainerCardProduto>

                                    }
                                />

                                <BtnPagamento onPress={() => (setScreensProdutos(false), setScreensResumo(true))}>
                                    <BtnPagamentoText>Carrinho</BtnPagamentoText>
                                </BtnPagamento>

                            </ContainerProdutos>
                        }


                        {screensResumo &&
                            <>
                                <ContentDescription>
                                    <ContentDescriptionHeader>
                                        <ContentDescriptionText>Forma de pagamento:</ContentDescriptionText>
                                        <ContentDescriptionText>{metodoPagamento == 'cash' ? "Dinheiro" : metodoPagamento == "card" ? "Cartão de crédito" : "Pix"} </ContentDescriptionText>
                                    </ContentDescriptionHeader>

                                    <Dialog.Container visible={descontoDialog}>
                                        <Dialog.Title>informe o valor - R$ {desconto ? desconto : "0.00"}</Dialog.Title>
                                        <Dialog.Description>
                                            Informe o valor para ser descontado
                                        </Dialog.Description>
                                        <MaskInput
                                            style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                            mask={dollarMask}
                                            value={desconto}
                                            onChangeText={t => setDesconto(t)}
                                            placeholder="Digite aqui o valor R$"
                                            keyboardType={"number-pad"} />
                                        <Dialog.Button label="Remover desconto" onPress={removerDesconto} />
                                        <Dialog.Button label="Aplicar" onPress={aplicarDesconto} />
                                    </Dialog.Container>

                                    <Divider />

                                    <List
                                        nestedScrollEnabled={true}
                                        style={{ marginTop: 10 }}
                                        showsVerticalScrollIndicator={false}
                                        data={produtosCarrinho}
                                        keyExtractor={(item, index) => index}
                                        renderItem={({ item, index }) =>
                                            <ContentDescriptionListProduct key={index}>
                                                <ContentDescriptionListProductText>{item.nome} - {item.quantidade}</ContentDescriptionListProductText>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <ContentDescriptionListProductText>R$ {item.preco}</ContentDescriptionListProductText>
                                                    <FontAwesome onPress={() => removerProduto(item)}
                                                        name="remove" size={24} color="red" style={{ marginLeft: 10, alignSelf: 'center' }} />
                                                </View>
                                            </ContentDescriptionListProduct>
                                        }
                                    />

                                    <Divider />

                                    <ContentDescriptionBody>
                                        <ContentDescriptionText>Total pago: </ContentDescriptionText>
                                        <ContentDescriptionBodyText>R$ {totalCarrinhoDesconto <= 0 ? "0.00" : totalCarrinhoDesconto} </ContentDescriptionBodyText>
                                    </ContentDescriptionBody>
                                </ContentDescription>

                                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                                    <ContainerFormaPagamento>
                                        <ContainerFormaPagamentoTipos>
                                            <ContainerFormaPagamentoCard
                                                status={metodoPagamento == "cash" ? true : false}
                                                onPress={() => setMetodoPagamento("cash")}>
                                                <FontAwesome name="money" size={32} color="black" />
                                                <ContainerFormaPagamentoCardText>Dinheiro</ContainerFormaPagamentoCardText>
                                            </ContainerFormaPagamentoCard>

                                            <ContainerFormaPagamentoCard
                                                status={metodoPagamento == "card" ? true : false}
                                                onPress={() => setMetodoPagamento("card")}>
                                                <FontAwesome name="credit-card" size={32} color="black" />
                                                <ContainerFormaPagamentoCardText>Cartão de crédito</ContainerFormaPagamentoCardText>
                                            </ContainerFormaPagamentoCard>
                                        </ContainerFormaPagamentoTipos>

                                        <ContainerFormaPagamentoTipos>
                                            <ContainerFormaPagamentoCard
                                                style={{ alignSelf: 'center', width: '100%' }}
                                                status={metodoPagamento == "pix" ? true : false}
                                                onPress={() => setMetodoPagamento("pix")}>
                                                <Image source={require('../../../assets/icon_pix.png')} />
                                                <ContainerFormaPagamentoCardText>Pix</ContainerFormaPagamentoCardText>
                                            </ContainerFormaPagamentoCard>
                                        </ContainerFormaPagamentoTipos>
                                    </ContainerFormaPagamento>

                                    <BtnPagamento onPress={abrirModalConfirmaPagamento}>
                                        <BtnPagamentoText>Pagamento</BtnPagamentoText>
                                    </BtnPagamento>
                                </ScrollView>
                            </>
                        }

                        <Modal isVisible={modalConfirmarPagamento} onBackdropPress={fecharModalConfirmaPagamento}>
                            <ContentDescriptionModal>
                                <AntDesign onPress={fecharModalConfirmaPagamento} name="close" size={24} color="#000" style={{ alignSelf: 'flex-end', marginBottom: 10 }} />

                                <ContentDescriptionHeader>
                                    <ContentDescriptionText>Forma de pagamento:</ContentDescriptionText>
                                    <ContentDescriptionText>{metodoPagamento} </ContentDescriptionText>
                                </ContentDescriptionHeader>

                                <ContentDescriptionHeader>
                                    <ContentDescriptionText>Cliente:</ContentDescriptionText>
                                    <ContentDescriptionText>{route.params.produto_carrinho.contact.name} </ContentDescriptionText>
                                </ContentDescriptionHeader>

                                <ContentDescriptionHeader>
                                    <ContentDescriptionText style={{ fontWeight: 'bold' }}>Adicionar desconto na venda: </ContentDescriptionText>
                                    <View style={{ flexDirection: 'row' }}>
                                        <ContentDescriptionText >- R$ {desconto ? desconto : "0.00"} </ContentDescriptionText>
                                        <MaterialIcons onPress={() => setDescontoDialog(true)}
                                            name="add-box" size={24} color="red" style={{ marginLeft: 5, alignSelf: 'center' }} />
                                    </View>
                                </ContentDescriptionHeader>

                                <Dialog.Container visible={descontoDialog}>
                                    <Dialog.Title>informe o valor - R$ {desconto ? desconto : "0.00"}</Dialog.Title>
                                    <Dialog.Description>
                                        Informe o valor para ser descontado
                                    </Dialog.Description>
                                    <MaskInput
                                        style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                        mask={dollarMask}
                                        value={desconto}
                                        onChangeText={t => setDesconto(t)}
                                        placeholder="Digite aqui o valor R$"
                                        keyboardType={"number-pad"} />
                                    <Dialog.Button label="Remover desconto" onPress={removerDesconto} />
                                    <Dialog.Button label="Aplicar" onPress={aplicarDesconto} />
                                </Dialog.Container>

                                <Divider />

                                <List
                                    nestedScrollEnabled={true}
                                    style={{ marginTop: 10 }}
                                    showsVerticalScrollIndicator={false}
                                    data={produtosCarrinho}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) =>
                                        <ContentDescriptionListProduct key={index}>
                                            <ContentDescriptionListProductText>{item.nome} - {item.quantidade} </ContentDescriptionListProductText>
                                            <View style={{ flexDirection: 'row' }}>
                                                <ContentDescriptionListProductText>R$ {item.preco}</ContentDescriptionListProductText>
                                            </View>
                                        </ContentDescriptionListProduct>
                                    }
                                />

                                <Divider />

                                <ContentDescriptionBody>
                                    <ContentDescriptionText>Total pago: </ContentDescriptionText>
                                    <ContentDescriptionBodyText>R$ {totalCarrinhoDesconto <= 0 ? "0.00" : totalCarrinhoDesconto} </ContentDescriptionBodyText>
                                </ContentDescriptionBody>

                                <BtnPagamento disabled={loadingPagamento ? true : false} onPress={pagamento} style={{ marginTop: 10, backgroundColor: 'green' }}>
                                    {loadingPagamento ? <ActivityIndicator color={"#fff"} /> : <BtnPagamentoText>Confirmar pagamento</BtnPagamentoText>}
                                </BtnPagamento>
                            </ContentDescriptionModal>
                        </Modal>
                    </>
                }

            </Content>
        </Container>
    );
}