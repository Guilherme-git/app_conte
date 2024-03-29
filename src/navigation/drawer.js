import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/customDrawer';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

import Home from '../screens/home'
import Produto from '../screens/produtos'
import ProdutoCadastro from '../screens/produtos/cadastro'
import ProdutoEditar from '../screens/produtos/editar'
import Vendas from '../screens/vendas';
import VendasCadastro from '../screens/vendas/cadastrar'
import VendasEditar from '../screens/vendas/editar'
import Cupom from '../screens/vendas/cupom'
import Pessoas from '../screens/pessoas'
import PessoasCadastro from '../screens/pessoas/cadastro'
import PessoasEditar from '../screens/pessoas/editar'

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

            <Drawer.Screen name="venda-cadastro" component={VendasCadastro}
                options={{
                    drawerItemStyle: { display: 'none' }
                }}
            />

            <Drawer.Screen name="venda-editar" component={VendasEditar}
                options={{
                    drawerItemStyle: { display: 'none' }
                }}
            />

            <Drawer.Screen name="cupom" component={Cupom}
                options={{
                    drawerItemStyle: { display: 'none' }
                }}
            />

            <Drawer.Screen name="pessoas" component={Pessoas}
                options={{
                    title: 'Pessoas',
                    drawerIcon: ({ color }) => (
                        <Entypo name="users" size={24} color={color} />
                    )
                }}
            />

            <Drawer.Screen name="pessoa-cadastro" component={PessoasCadastro}
                options={{
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen name="pessoa-editar" component={PessoasEditar}
                options={{
                    drawerItemStyle: { display: 'none' },
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
            <Drawer.Screen name="produto-cadastro" component={ProdutoCadastro}
                options={{
                    drawerItemStyle: { display: 'none' },
                }}
            />
            <Drawer.Screen name="produto-editar" component={ProdutoEditar}
                options={{
                    drawerItemStyle: { display: 'none' },
                }}
            />

        </Drawer.Navigator>
    );
}