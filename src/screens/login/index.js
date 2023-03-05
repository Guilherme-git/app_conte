import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/input/index";

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
    const [mostrarSenha, setMostrarSenha] = useState(false)

    const entrar = () => {
        navigation.navigate('drawer')
    }

    return (
        <LinearGradient colors={['#008be3', '#b3f4fe']} style={{ flex: 1 }}>

            <ContainerImage>
                <Image resizeMode="contain" source={require('../../assets/logo_conte.png')} />
            </ContainerImage>

            <Content>
                <Title>Acessar</Title>

                <ContainerForm>
                    <Input placeholder="Usuário"/>
                    <Input placeholder="Senha" secureTextEntry={mostrarSenha ? false : true} />

                    <ContainerMostrarSenha>
                        <Checkbox
                            value={mostrarSenha}
                            onValueChange={value => setMostrarSenha(value)}
                            color={mostrarSenha ? '#008be3' : undefined}
                            style={{ alignSelf: 'center', borderRadius: 10 }}
                        />
                        <TextMostarSenha onPress={()=>setMostrarSenha(!mostrarSenha)}>Mostrar senha</TextMostarSenha>
                    </ContainerMostrarSenha>


                    <LinearGradient
                        colors={['#008be3', '#3660B4']} style={{
                            height: 40,
                            borderRadius: 8,
                            marginTop: 50,
                        }}>
                        <Btn onPress={entrar}>
                            <TextBtn>Entrar</TextBtn>
                        </Btn>

                    </LinearGradient>
                </ContainerForm>
            </Content>
        </LinearGradient>
    );
}