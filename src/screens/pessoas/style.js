import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: #008be3;
`;

export const Content = styled.View`
    flex: 1;
    background-color: #fff;
    border-top-left-radius: ${RFValue(25)}px;
    border-top-right-radius: ${RFValue(25)}px;
    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
`;

export const ContainerBtn = styled.TouchableOpacity`
    margin-top: ${RFValue(20)}px;
    width: ${RFValue(150)}px;
    align-self: flex-end;
    background-color: #008be3;
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(8)}px;
    justify-content: center;
    align-items: center;
`;

export const TextBtn = styled.Text`
    color: #fff;
    font-size: ${RFValue(15)}px;
`;

export const ContainerSearch = styled.View`
    background-color: #f5f5f5;
    border-radius: ${RFValue(5)}px;
    height: ${RFValue(40)}px;
    margin-top: ${RFValue(20)}px;
    flex-direction: row;
    justify-content: space-between;
    padding-right: ${RFValue(40)}px;
`;

export const ContainerList = styled.View`
    flex: 1;
    margin-bottom: ${RFValue(10)}px;
    margin-top: ${RFValue(20)}px;
    padding: ${RFValue(10)}px;
`;

export const List = styled.FlatList`

`;

export const Card = styled.View`
    height: ${RFValue(70)}px;
    background-color: #f5f5f5;
    border-radius: ${RFValue(5)}px;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: ${RFValue(10)}px;
    
`;

export const CardInfo = styled.View`
    flex: 1;
    margin-right: ${RFValue(10)}px;
    margin: ${RFValue(10)}px;
`;

export const CardTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    color: #008be3;
    font-weight: bold;
`;

export const CardCpfCnpj = styled.Text`
    font-size: ${RFValue(13)}px;
    color: #cacaca;
    font-weight: bold;
`;

export const BtnIcon = styled.TouchableOpacity`
    width: ${RFValue(70)}px;
    justify-content: center;
    align-items: center;
    border-radius: ${RFValue(5)}px;
`;