import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

export const Content = styled.View`
    flex: 1;
    background-color: #fff;
    margin-top: ${RFValue(-50)}px;
    border-top-left-radius: ${RFValue(50)}px;
    border-top-right-radius: ${RFValue(50)}px;
    padding: ${RFValue(20)}px;
`;

export const Header = styled.View`
    height: ${RFPercentage(30)}px;
    margin-top: ${RFValue(30)}px;
    padding: ${RFValue(20)}px;
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderInfo = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: ${RFValue(60)}px;
`;

export const ContainerHeaderInfo = styled.View`
    margin-left: ${RFValue(10)}px;
`;

export const NameUser = styled.Text`
   color: #fff;
   font-size: ${RFValue(22)}px;
   font-weight: 900;
`;

export const ContainerDate = styled.View`
    background-color: #fff;
    border-radius: ${RFValue(5)}px;
    width: ${RFPercentage(10)}px;
    height: ${RFValue(25)}px;
    justify-content: center;
    align-items: center;
`;

export const DateText = styled.Text`
    color: #008be3;
    font-weight: 900;
`;

export const ContainerImage = styled.TouchableOpacity`
    height: ${RFValue(60)}px;
    width: ${RFValue(60)}px;
    padding: ${RFValue(10)}px;
    justify-content: center;
    align-items: center;
`;

export const ImageUser = styled.Image`
    height: ${RFValue(40)}px;
    width: ${RFValue(40)}px;
    border-radius: ${RFValue(15)}px;
`;

export const ContainerCard = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const Card = styled.TouchableOpacity`
    background-color: #F5F6FC;
    height: ${RFValue(110)}px;
    width: ${RFValue(140)}px;
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
`;

export const CardVenda = styled.TouchableOpacity`
    margin-top: ${RFValue(-50)}px;
    margin-bottom: ${RFValue(20)}px;
    background-color: #F5F6FC;
    height: ${RFValue(110)}px;
    width: ${RFValue(140)}px;
    border-radius: ${RFValue(5)}px;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(10)}px;
    align-self: center;
`;

export const CardImage = styled.Image`
    height: ${RFValue(50)}px;
    width: ${RFValue(50)}px;
`;

export const CardText = styled.Text`
    color: #008be3;
    font-size: ${RFValue(15)}px;
    margin-top: ${RFValue(10)}px;
`;