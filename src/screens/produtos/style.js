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
`;