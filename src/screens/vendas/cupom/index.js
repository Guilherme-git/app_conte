import React, { useState, useCallback, useEffect } from "react";
import {Linking} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from "../../../components/header";
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../../service';
import WebView from "react-native-webview";


import {
    Container,
    Content,
} from './style'

export default () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useFocusEffect(useCallback(() => {
        const response = async () => {
            const userLogado = JSON.parse(await AsyncStorage.getItem("@app_conte"));
            setUser(userLogado)
        }

        response()
    }, []))

    return (
        <Container>
            <Header nome={"Comprovante"} />
            <Content>
                <WebView
                startInLoadingState={true}
                
                    source={{
                        uri: " http://docs.google.com/gview?embedded=true&url=http://app.contetecnologia.com.br/api/app/sell/cupom?id=1&business_id=1"
                    }} />

            </Content>
        </Container>
    );
}