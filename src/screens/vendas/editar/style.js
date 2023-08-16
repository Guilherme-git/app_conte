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

export const ContainerFiltro = styled.View`
   background-color: blue;
   margin-bottom: ${RFValue(10)}px;
   border-radius: ${RFValue(8)}px;
   padding: ${RFValue(8)}px;
   background-color: #ccc;
`;

export const ContainerProdutos = styled.View`
    flex: 1;
    margin-top: ${RFValue(10)}px;
    margin-bottom: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
`;

export const ContainerSearch = styled.View`
    background-color: #f5f5f5;
    border-radius: ${RFValue(5)}px;
    height: ${RFValue(40)}px;
    flex-direction: row;
    justify-content: space-between;
    padding-right: ${RFValue(40)}px;
`;

export const ContainerCategoria = styled.View`
    margin-top: ${RFValue(5)}px;
    margin-bottom: ${RFValue(10)}px;
`;

export const List = styled.FlatList`
   margin-bottom: ${RFValue(20)}px;
`;

export const ContainerCardProduto = styled.View`
   justify-content: center;
   align-items: center;
   width: 50%;
`;

export const CardProduto = styled.TouchableOpacity`
    background-color: blue;
    height: ${RFValue(120)}px;
    width: ${RFValue(150)}px;
    border-radius: ${RFValue(8)}px;
    background-color: #f5f5f5;
    margin-top: ${RFValue(10)}px;
`;

export const CardProdutoName = styled.Text`
    align-self: center;
    color: #666;
    font-weight: bold;
`;

export const CardProdutoValor = styled.Text`
    align-self: center;
    color: #666;
    font-weight: bold;
    margin-bottom: ${RFValue(10)}px;
`;

export const CardProdutoImage = styled.Image`
   margin-top: ${RFValue(10)}px;
   height: ${RFValue(100)}px;
   width: ${RFValue(100)}px;
   align-self: center;
   margin-right: ${RFValue(10)}px;
   border-radius: ${RFValue(8)}px;
`;

export const Divider = styled.View`
    background-color: #696969;
    height: 1px;
`;

export const ContainerScreens = styled.View`
    flex-direction: row;
    margin-top: ${RFValue(10)}px;
    justify-content: space-between;
    width: ${RFPercentage(40)}px;
    align-self: center;
`;

export const ScreensProduto = styled.TouchableOpacity`
    width: 50%;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    margin-right: ${RFValue(5)}px;
    border-bottom: ${RFValue(10)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-color: ${props => props.status ? '#008be3' : '#fff'} ;
    background-color: ${props => props.status ? '#ccc' : '#fff'} ;;
`;

export const ScreensResumo = styled.TouchableOpacity`
    width: 50%;
    height: ${RFValue(40)}px;
    justify-content: center;
    align-items: center;
    margin-left: ${RFValue(5)}px;
    border-bottom: ${RFValue(10)}px;
    border-bottom-width: ${RFValue(2)}px;
    border-color: ${props => props.status ? '#008be3' : '#fff'} ;
    background-color: ${props => props.status ? '#ccc' : '#fff'} ;;
`;

export const TotalScreenResumo = styled.View`
    background-color: red;
    margin-top: ${RFValue(-25)}px;
    padding: ${RFValue(2)}px;
    height: ${RFValue(25)}px;
    border-radius: ${RFPercentage(50)}px;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
`;

export const TotalScreenResumoText = styled.Text`
   font-size: ${RFValue(15)}px;
   color: #fff;
`;

export const ScreensText = styled.Text`
   font-size: ${RFValue(15)}px;
`;

export const BtnPagamento = styled.TouchableOpacity`
    background-color: #008be3;
    height: ${RFValue(40)}px;
    border-radius: ${RFValue(8)}px;
    justify-content: center;
    align-items: center;
    margin-bottom: ${RFValue(20)}px;
`;

export const BtnPagamentoText = styled.Text`
    color: #fff;
    font-size: ${RFValue(18)}px;
`;

export const ContentDescription = styled.View`
    background-color: #f5f5f5;
    height: ${RFValue(300)}px;
    margin-top: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
    padding: ${RFValue(10)}px;
`;

export const ContentDescriptionModal = styled.View`
    background-color: #f5f5f5;
    height: ${RFValue(350)}px;
    margin-top: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
    padding: ${RFValue(10)}px;
`;

export const ContentDescriptionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
`;

export const ContentDescriptionText = styled.Text`
    align-self: center;
`;

export const ContentDescriptionListProduct = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(2)}px;
`;

export const ContentDescriptionListProductText = styled.Text`
   
`;

export const ContentDescriptionBody = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${RFValue(5)}px;
    margin-top: ${RFValue(10)}px;
`;

export const ContentDescriptionBodyText = styled.Text`
    font-weight: bold;
    font-size: ${RFValue(18)}px;
`;

export const ContainerFormaPagamento = styled.View`
    margin-top: ${RFValue(15)}px;
    margin-bottom: ${RFValue(10)}px;
    border-radius: ${RFValue(8)}px;
    background-color: #f5f5f5;
    width: ${RFValue(280)}px;
    padding: ${RFValue(10)}px;
    align-self: center;
`;

export const ContainerFormaPagamentoTipos = styled.View`
    flex-direction: row;
    margin-bottom: ${RFValue(10)}px;
    justify-content: space-between;
`;

export const ContainerFormaPagamentoCard = styled.TouchableOpacity`
    background-color: ${props => props.status ? '#ccc' : '#fff'} ;
    height: ${RFValue(80)}px;
    width: ${RFValue(120)}px;
    border-radius: ${RFValue(8)}px;
    justify-content: center;
    align-items: center;
`;

export const ContainerFormaPagamentoCardText = styled.Text`
    font-size: ${RFValue(15)}px;
    margin-top: ${RFValue(5)}px;
`;