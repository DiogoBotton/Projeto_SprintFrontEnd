import React, { useContext, useEffect, useState } from 'react';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer } from '@react-navigation/native';

// Menu lateral e navegação por pilha
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Context
import AuthContext, { AuthProvider } from './context/auth';

// Pages
import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro/index';
import Generos from './pages/Generos/index';
import Filmes from './pages/Filmes/index';

// Interfaces
import Token from './interfaces/token';

// Token Decoder
import jwt from './services/tokenDecoder';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

function Routes() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const [tokenUser, setTokenUser] = useState<Token | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  // Adquirindo propriedades do authContext
  const { logged, IsAdmin, IsComum } = useContext(AuthContext);

  // TODO: PROBLEMA, PROPRIEDADES VINDO UNDEFINED
  console.log('logado? ' + logged + ' é adm? ' + IsAdmin)

  // const Logout = async () => {
  //   await AsyncStorage.removeItem('token-usuario');
  // }

  const Logged = async () => {
    const response = await AsyncStorage.getItem('token-usuario');

    if (response !== null) {
      setIsLogged(true);
      TokenDecoder(response);
    }
    else {
      setIsLogged(false);
      setTokenUser(null);
    }
  }

  const TokenDecoder = (token: string) => {
    // Token Decoder
    let tokenDecoded = jwt(token);

    setTokenUser(tokenDecoded);
  }

  useEffect(() => {
    Logged();
  }, [])

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
    <NavigationContainer>
      <AuthProvider>

        <Stack.Navigator>
          {/* 
            Está logado? Se sim, é Admin? Se sim retorna stack de Adm. 
            Se não, retorna Stack de Comum.
            Se não estiver logado, retorna stack Guest

            // TODO: O Redirecionamento funciona, mas não o faz automaticamente logo após logar. Redireciona após atualizar a página.
          */}

          {isLogged ? tokenUser?.role === 'Administrador' ?
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

          {/* //TODO: Caindo sempre no Stack 'Guest' por conta dos booleans que estão undefined's */}
          {/* {logged ? IsAdmin ?
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
          } */}

        </Stack.Navigator>

      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;