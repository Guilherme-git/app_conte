import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Content = styled.View`
    flex: 1;
    background-color: #fff;
    margin-top: ${RFPercentage(5)}px;
    border-top-left-radius: ${RFValue(50)}px;
    border-top-right-radius: ${RFValue(50)}px;
`;

export const Title = styled.Text`
    color: #008be3;
    font-size: ${RFValue(22)}px;
    font-weight: bold;
    text-align: center;
    margin-top: ${RFValue(5)}px;
    font-style: italic;
`;

export const ContainerImage = styled.View`
    height: ${RFValue(90)}px;
    margin-top: ${RFValue(50)}px;
    padding: ${RFValue(20)}px;
    background-color: #fff;
    margin-left: ${RFValue(20)}px;
    margin-right: ${RFValue(20)}px;
    border-radius: ${RFValue(10)}px;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const Image = styled.Image`
    height: ${RFValue(80)}px;
    width: ${RFValue(200)}px;
    border-radius: ${RFValue(15)}px;
    align-self: center;
`;

export const ContainerForm = styled.View`
    margin: ${RFValue(20)}px;
`;

export const ContainerMostrarSenha = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

export const TextMostarSenha = styled.Text`
    margin-left: ${RFValue(5)}px;
    color: #666;
    font-size: ${RFValue(15)}px;
    align-items: center;
`;

export const Btn = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const TextBtn = styled.Text`
    color: #fff;
`;