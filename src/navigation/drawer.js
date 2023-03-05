import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/customDrawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();

import Home from '../screens/home'
import Produto from '../screens/produtos'
import Vendas from '../screens/vendas';
import Clientes from '../screens/clientes'

export default () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName='home'
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: '#008be3',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#008be3',
                drawerLabelStyle: {
                    marginLeft: -15
                }
            }}
        >

            <Drawer.Screen name="home" component={Home}
                options={{
                    title: 'Home',
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-sharp" size={24} color={color} />
                    )
                }}
            />

            <Drawer.Screen name="venda" component={Vendas}
                options={{
                    title: 'Vendas',
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="point-of-sale" size={24} color={color} />
                    )
                }}
            />

            <Drawer.Screen name="cliente" component={Clientes}
                options={{
                    title: 'Clientes',
                    drawerIcon: ({ color }) => (
                        <Entypo name="users" size={24} color={color} />
                    )
                }}
            />

            <Drawer.Screen name="produto" component={Produto}
                options={{
                    title: 'Produtos',
                    drawerIcon: ({ color }) => (
                        <FontAwesome5 name="box" size={24} color={color} />
                    )
                }}
            />

        </Drawer.Navigator>
    );
}