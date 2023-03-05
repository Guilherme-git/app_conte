import React from "react";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();

    return (
        <Entypo
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            name="menu"
            size={35}
            color="#fff" 
        />
    )
}