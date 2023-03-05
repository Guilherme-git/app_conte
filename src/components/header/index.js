import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import ButtonDrawer from "../buttonDrawer";

import {
    Container,
    ContainerIcon,
    TextHeader,
    BtnButtonDrawer
} from './style';

export default ({nome}) => {
    const navigation = useNavigation();

    return (
            <Container>
                <ContainerIcon onPress={() => navigation.goBack()}>
                    <ButtonDrawer />
                </ContainerIcon>

                <TextHeader>{nome}</TextHeader>
            </Container>
    );
}