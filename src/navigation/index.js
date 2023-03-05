import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "../screens/login";
import Home from '../screens/home'
import Produto from '../screens/produtos'
import Drawer from "./drawer";

export default () => {
    return (
        <Stack.Navigator
            initialRouteName="drawer"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="drawer" component={Drawer} />
        
            {/* <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="produto" component={Produto} /> */}
        </Stack.Navigator>
    );
}