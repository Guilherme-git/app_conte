import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.TextInput`
    background-color: #f5f5f5;
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(10)}px;
    height: ${RFValue(40)}px;
    margin-bottom: ${RFValue(10)}px;
    width: 100%;
`;