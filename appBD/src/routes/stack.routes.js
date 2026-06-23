
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './drawer.routes';


// IMPORTAR AS TELAS QUE SERÃO USADAS NO APP
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';


const Stack = createNativeStackNavigator();

function StackNavigator(){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>   

            {/* A TELA QUE TERÁ O MENU LATERAL DEVE ESTAR NO COMPONENT COMO O NOME DO MENU LATERAL DrawerRoutes */}
            <Stack.Screen name="Home" component={DrawerRoutes} />                     
            <Stack.Screen name="Cadastro" component={Cadastro} /> 
          
        </Stack.Navigator>
    )
}

function AppRoutes(){
    return(
        <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    )
}
export default AppRoutes;