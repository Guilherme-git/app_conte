import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Login from "../screens/login";

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
        </Stack.Navigator>
    );
}