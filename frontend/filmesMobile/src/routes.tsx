import React, { useContext } from 'react';

// Menu lateral e navegação por pilha
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Context
import AuthContext from './context/auth';

// Pages
import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro/index';
import Generos from './pages/Generos/index';
import Filmes from './pages/Filmes/index';
import { ActivityIndicator, View } from 'react-native';

function Routes() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  // Adquirindo propriedades do authContext
  const { logged, IsAdmin, isLoading, tokenDecoded, IsComum } = useContext(AuthContext);

  // Para adquirir o tokenDecoded, apenas use o contexto como neste exemplo
  console.log(tokenDecoded)

  // Caso estiver carregando irá mostrar um ícone de carregamento
  if(isLoading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // Stack de Guest (telas de usuário que não está autenticado)
  const Guest = () => {
    return (
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          component={Login}
        />

        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
        />
      </Tab.Navigator>
    );
  }

  // Stack de Administrador (telas de adm)
  const Adm = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
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

  // Stack de usuário Comum (telas de comum)
  const Comum = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
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
    <Stack.Navigator>
      {/* 
        Está logado? Se sim, é Admin? Se sim retorna stack de Adm. 
        Se não, retorna Stack de Comum.
        Se não estiver logado, retorna stack Guest
      */}

      {/* FUNCIONOUU PORAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
      {logged ? IsAdmin ?
        (<Stack.Screen
          name="Adm"
          component={Adm}
        />) :

        (<Stack.Screen
          name="Comum"
          component={Comum}
        />) :

        (< Stack.Screen
          name="Guest"
          component={Guest}
        />)
      }

    </Stack.Navigator>
  );
}

export default Routes;