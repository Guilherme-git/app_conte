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

export const ContainerForm = styled.View`
    margin-top: ${RFValue(20)}px;
    margin-left: ${RFValue(10)}px;
    margin-right: ${RFValue(10)}px;
`;

export const FormControl = styled.View`
    margin-top: ${RFValue(10)}px;
`;

export const ContainerBtn = styled.TouchableOpacity`
    margin-top: ${RFValue(30)}px;
    margin-bottom: ${RFValue(30)}px;
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