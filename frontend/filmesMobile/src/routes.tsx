import React from 'react';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer } from '@react-navigation/native';

// Menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// Pages
import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro/index';
import Generos from './pages/Generos/index';
import Filmes from './pages/Filmes/index';

function Routes() {

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const Adm = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          name="Generos"
          component={Generos}
        />
        <Drawer.Screen
          name="Filmes"
          component={Filmes}
        />
      </Drawer.Navigator>
    );
  }

  const Comum = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          name="Filmes"
          component={Filmes}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
          />

          <Stack.Screen
            name="Adm"
            component={Adm}
          />
          
          <Stack.Screen
            name="Comum"
            component={Comum}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;