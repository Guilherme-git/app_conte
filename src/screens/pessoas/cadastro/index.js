import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { SelectList } from 'react-native-dropdown-select-list'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Divider from 'react-native-divider';
import Header from "../../../components/header";
import Label from "../../../components/label";
import Input from '../../../components/input';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput, { Masks } from 'react-native-mask-input';
import api from '../../../service';

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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const countries = ["Juridica", "Fisica"]
    const [tipo_pessoa, setTipo_pessoa] = useState(null)
    const [nome, setNome] = useState(null);
    const [cpf_cnpj, setCpf_cnpj] = useState(null);
    const [inscricao_estadual, setInscricao_estadual] = useState(null);
    const [razao_social, setRazao_social] = useState(null);
    const [nome_fantansia, setNome_fantasia] = useState(null);
    const [uf, setUf] = useState(null);
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState(null);
    const [cidadeIbge, setCidadeIbge] = useState(null);
    const [bairro, setBairro] = useState(null);
    const [rua, setRua] = useState(null);
    const [numero, setNumero] = useState(null);
    const [complemento, setComplemento] = useState(null);
    const [ponto_referencia, setPonto_referencia] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefone_fixo, setTelefone_fixo] = useState(null);
    const [telefone_alternativo, setTelefone_alternativo] = useState(null);
    const [celular, setCelular] = useState(null);
    const [selected, setSelected] = useState("");
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: '',
        colorButton: ''
    })

    useFocusEffect(useCallback(() => {
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)
        }

        response()
        limparCampos();
    }, []))

    useEffect(() => {
        const data = async () => {
            if (cep.replace("-", "").length == 8) {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const responseData = await response.json();
                setCidade(responseData.localidade)
                setCidadeIbge(responseData.ibge)
                setBairro(responseData.bairro)
                setRua(responseData.logradouro)
            }
        }
        data()
    }, [cep])

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
            const response = await api.post('/app/contact/create', {
                tipo_pessoa: tipo_pessoa == "Fisica" ? "customer" : "supplier",
                cpf_cnpj,
                inscricao_estadual,
                razao_social,
                nome_fantansia,
                cep,
                cidade: cidadeIbge,
                bairro,
                rua,
                numero,
                ponto_referencia,
                email,
                telefone_alternativo,
                celular,
                business: user.business.id,
                owner: user.id
            })

            if(response.data.message == "Contato salvo") {
                setAlert({
                    open: true,
                    title: 'Salvo',
                    message: 'Contato salvo com sucesso',
                    colorButton: '#5CB85C'
                })

                navigation.navigate("pessoas")
            }

            console.log(response.data)
        } catch (error) {
            setLoading(false)
        }
        setLoading(false)

    }

    const camposVazios = () => {
        if (!tipo_pessoa || !cpf_cnpj || !inscricao_estadual || !razao_social || !cep || !cidade || !bairro || !rua || !numero || !email || !celular) {
            return true
        }
        return false;
    }

    const limparCampos = () => {
        setTipo_pessoa(null)
        setCpf_cnpj(null)
        setInscricao_estadual(null)
        setRazao_social(null)
        setNome_fantasia(null)
        setCep("")
        setCidade(null)
        setBairro(null)
        setRua(null)
        setNumero(null)
        setPonto_referencia(null)
        setEmail(null)
        setCelular(null)
        setTelefone_alternativo(null)
    }

    return (
        <Container>
            <Header nome={"Cadastro de pessoas"} />

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
                <ScrollView style={{ marginTop: 10, marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                    <ContainerForm>
                        <Label text={"Tipo*:"} />
                        <SelectDropdown
                            data={countries}
                            defaultButtonText={"Selecione"}
                            buttonStyle={{ borderRadius: 8, width: '100%', marginBottom: 10, height: 40 }}
                            buttonTextStyle={{ color: '#008be3' }}
                            onSelect={(selectedItem, index) => setTipo_pessoa(selectedItem)}
                        />
                        <FormControl>
                            <Label text={"CPF/CNPJ*:"} />

                            {tipo_pessoa == "Fisica" ?
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                                    value={cpf_cnpj}
                                    onChangeText={t => setCpf_cnpj(t)}
                                    placeholder={"CPF/CNPJ"} />
                                :
                                <MaskInput
                                    style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                    mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
                                    value={cpf_cnpj}
                                    onChangeText={t => setCpf_cnpj(t)}
                                    placeholder={"CPF/CNPJ"} />
                            }


                        </FormControl>

                        <FormControl>
                            <Label text={"Inscrição estadual/RG*:"} />
                            <Input
                                value={inscricao_estadual}
                                onChangeText={t => setInscricao_estadual(t)}
                                placeholder={"Inscrição estadual/RG"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Razão social/Nome*:"} />
                            <Input
                                value={razao_social}
                                onChangeText={t => setRazao_social(t)}
                                placeholder={"Razão social"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Nome fantasia:"} />
                            <Input
                                value={nome_fantansia}
                                onChangeText={t => setNome_fantasia(t)}
                                placeholder={"Nome fantasia"} />
                        </FormControl>

                        <Divider color="#008be3" borderColor="#008be3">Endereço</Divider>

                        {/* <Label text={"UF:"} />
                        <SelectList
                            setSelected={(val) => setSelected(val)}
                            data={data}
                            boxStyles={{ borderRadius: 8, borderWidth: 0, backgroundColor: '#f5f5f5', height: 40 }}
                            placeholder="Selecione a UF"
                            searchPlaceholder="Digite o nome da UF"
                            save="key"
                        /> */}

                        <FormControl>
                            <Label text={"CEP*:"} />
                            <MaskInput
                                style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                value={cep}
                                onChangeText={t => setCep(t)}
                                placeholder={"CEP"} />

                        </FormControl>

                        <FormControl>
                            <Label text={"Cidade*:"} />
                            <Input
                                value={cidade}
                                onChangeText={t => setCidade(t)}
                                placeholder={"Cidade"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Bairro*:"} />
                            <Input
                                value={bairro}
                                onChangeText={t => setBairro(t)}
                                placeholder={"Bairro"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Rua*:"} />
                            <Input
                                value={rua}
                                onChangeText={t => setRua(t)}
                                placeholder={"Rua"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Número*:"} />
                            <Input
                                value={numero}
                                onChangeText={t => setNumero(t)}
                                placeholder={"Número"} />
                        </FormControl>

                        {/* <FormControl>
                            <Label text={"Complemento:"} />
                            <Input
                                value={complemento}
                                onChangeText={t => setComplemento(t)}
                                placeholder={"Complemento"} />
                        </FormControl> */}

                        <FormControl>
                            <Label text={"Ponto de referência:"} />
                            <Input
                                value={ponto_referencia}
                                onChangeText={t => setPonto_referencia(t)}
                                placeholder={"Ponto de referência"} />
                        </FormControl>

                        <Divider color="#008be3" borderColor="#008be3">Contato</Divider>

                        <FormControl>
                            <Label text={"Email*:"} />
                            <Input
                                value={email}
                                onChangeText={t => setEmail(t)}
                                placeholder={"Email"} />
                        </FormControl>

                        {/* <FormControl>
                            <Label text={"Telefone fixo:"} />
                            <Input
                                value={telefone_fixo}
                                onChangeText={t => setTelefone_fixo(t)}
                                placeholder={"Telefone fixo"} />
                        </FormControl> */}

                        <FormControl>
                            <Label text={"Celular*:"} />
                            <MaskInput
                                style={{ backgroundColor: '#f5f5f5', borderRadius: 5, padding: 10, height: 40, marginBottom: 10, width: '100%' }}
                                mask={Masks.BRL_PHONE}
                                value={celular}
                                onChangeText={t => setCelular(t)}
                                placeholder={"Celular"} />
                        </FormControl>

                        <FormControl>
                            <Label text={"Telefone alternativo:"} />
                            <Input
                                value={telefone_alternativo}
                                onChangeText={t => setTelefone_alternativo(t)}
                                placeholder={"Telefone alternativo"} />
                        </FormControl>

                        <ContainerBtn onPress={cadastrar} disabled={loading ? true : false}>
                            {loading ? <ActivityIndicator color={"#fff"} /> : <TextBtn>Salvar</TextBtn>}
                        </ContainerBtn>


                    </ContainerForm>
                </ScrollView>
            </Content>
        </Container>
    );
}