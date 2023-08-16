import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

export const ContainerBtnImage = styled.TouchableOpacity`
    border-radius: ${RFValue(8)}px;
    margin-bottom: ${RFValue(10)}px;
    height: ${RFValue(40)}px;
    background-color: #EFEFEF;
    justify-content: center;
    align-items: center;
`;

export const TextBtnImage = styled.Text`
    color: #008be3;
    font-size: ${RFValue(17)}px;
`;

export const ContainerShowImage = styled.View`
    background-color: #EFEFEF;
    width: ${RFPercentage(35)}px;
    height: ${RFPercentage(25)}px;
    margin-bottom: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
    align-self: center;
    
`;

export const Image = styled.Image`
    height: 85%;
    width: 100%;
    border-top-left-radius: ${RFValue(8)}px;
    border-top-right-radius: ${RFValue(8)}px;
`;

export const BtnRemoverImage = styled.TouchableOpacity`
   background-color: #B22222;
   flex: 1;
   border-bottom-left-radius: ${RFValue(8)}px;
   border-bottom-right-radius: ${RFValue(8)}px;
   justify-content: center;
   align-items: center;
`;

export const TextBtnRemoverImage = styled.Text`
   color: #fff;
   font-weight: bold;
`;