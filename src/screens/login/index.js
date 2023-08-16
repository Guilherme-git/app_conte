import React, { useState, useCallback } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Input from "../../components/input/index";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service'

import {
    Content,
    Image,
    Title,
    ContainerForm,
    ContainerMostrarSenha,
    TextMostarSenha,
    Btn,
    TextBtn,
    ContainerImage
} from './style';

export default () => {
    const navigation = useNavigation()
    const [usuario, setUsuario] = useState("conte");
    const [senha, setSenha] = useState("Bm152612*");
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        title: '',
        message: ''
    })

    useFocusEffect(
        useCallback(() => {
            const response = async () => {
                if ((await AsyncStorage.getItem('@app_conte')) !== null) {
                    navigation.navigate('drawer');   
                }
            };
            response();
        }, []),
    );


    const entrar = async () => {
        if (!usuario || !senha) {
            setAlert({
                open: true,
                title: 'Atenção',
                message: 'Preencha todas as informações'
            })
            return
        }
        try {
            setLoading(true)
            const response = await api.post('/app/login', {
                usuario,
                senha
            });
            const user = response.data.user;
            const business = response.data.business
            const data = Object.assign(user, {business: business})
           
            await AsyncStorage.setItem("@app_conte", JSON.stringify(data))
            navigation.navigate('drawer')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                setAlert({
                    open: true,
                    title: 'Atenção',
                    message: error.response.data.message
                })
            }
            return
        }
    }

    return (
        <LinearGradient colors={['#008be3', '#b3f4fe']} style={{ flex: 1 }}>

            <ContainerImage>
                <Image resizeMode="contain" source={require('../../assets/logo_conte.png')} />
            </ContainerImage>

            <AwesomeAlert
                show={alert.open}
                title={alert.title}
                message={alert.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    setAlert({
                        open: false,
                        title: '',
                        message: ''
                    })

                }}
            />

            <Content>
                <Title>Acessar</Title>

                <ContainerForm>
                    <Input placeholder="Usuário" value={usuario} onChangeText={t => setUsuario(t)} />
                    <Input placeholder="Senha" value={senha} onChangeText={t => setSenha(t)} secureTextEntry={mostrarSenha ? false : true} />

                    <ContainerMostrarSenha>
                        <Checkbox
                            value={mostrarSenha}
                            onValueChange={value => setMostrarSenha(value)}
                            color={mostrarSenha ? '#008be3' : undefined}
                            style={{ alignSelf: 'center', borderRadius: 10 }}
                        />
                        <TextMostarSenha onPress={() => setMostrarSenha(!mostrarSenha)}>Mostrar senha</TextMostarSenha>
                    </ContainerMostrarSenha>


                    <LinearGradient
                        colors={['#008be3', '#3660B4']} style={{
                            height: 40,
                            borderRadius: 8,
                            marginTop: 50,
                        }}>
                        <Btn onPress={entrar} disabled={loading && true}>
                            {loading ? <ActivityIndicator color={"#fff"} /> : <TextBtn>Entrar</TextBtn>}

                        </Btn>

                    </LinearGradient>
                </ContainerForm>
            </Content>
        </LinearGradient>
    );
}