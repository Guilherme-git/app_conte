import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    height: ${RFPercentage(15)}px;
    justify-content: flex-start;
    flex-direction: row;
`;

export const ContainerIcon = styled.TouchableOpacity`
    align-self: center;
    margin-top: ${RFValue(10)}px;
    margin-top: ${RFValue(15)}px;
    margin-left: ${RFValue(20)}px;
`;

export const TextHeader = styled.Text`
    flex: 1;
    color: #fff;
    align-self: center;
    margin-left: ${RFValue(25)}px;
    margin-top: ${RFValue(15)}px;
    font-size: ${RFValue(20)}px;
`