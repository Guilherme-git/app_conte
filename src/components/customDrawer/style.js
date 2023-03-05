import styled from "styled-components/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
`;

export const Footer = styled.View`
    background-color: #fff;
    height: ${RFValue(100)}px;
    padding: ${RFValue(15)}px;
    border-top-width: 1px;
    border-top-color: #DCE0DD;

`;

export const BtnSair = styled.TouchableOpacity`
    width: ${RFValue(60)}px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

export const TextBtnSair = styled.Text`
    font-size: ${RFValue(18)}px;
    color: #7E1A1E;
`;

export const TextVersao = styled.Text`
    color: #999;
    margin-top: ${RFValue(15)}px;
`;

export const ContainerInfoUser = styled.View`
   margin-bottom: ${RFValue(20)}px;
   padding: ${RFValue(10)}px;
   border-bottom-width: 1px;
    border-bottom-color: #DCE0DD;
`;

export const NomeUser = styled.Text`
    color: blue;
    align-self: flex-start;
    margin-top: ${RFValue(10)}px;
    color: #000;
    font-size: ${RFValue(16)}px;
`;

export const ImageUser = styled.Image`
    align-self: flex-start;
    height: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
    border-radius: ${RFValue(15)}px;
    border-radius: ${RFPercentage(50)}px;
`;

export const ContainerList = styled.View`
    margin-left: ${RFValue(5)}px;
    margin-right: ${RFValue(5)}px;
    margin-bottom: ${RFValue(50)}px;
`;