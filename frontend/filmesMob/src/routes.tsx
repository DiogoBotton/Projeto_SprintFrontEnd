/* eslint-disable prettier/prettier */
import React from 'react-native';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// Menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';

// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import Login from './src/pages/Login/index';
import Home from './src/pages/Home/index';

// Jwt Decode Native
import jwt from 'jwt-decode';

interface token {
  email: string,
  unique_name: string,
  jti: number,
  role: string,
  iss: string,
  aud: string
}

function Routes() {
  // Botão logout
  const logout = () => {
    // Remove o token do localStorage
    AsyncStorage.removeItem('token-usuario');

    // Envia usuário para home
    //history.push('/login');
  }
  const Drawer = createDrawerNavigator();

  var token = Object.values(AsyncStorage.getItem('token-usuario'))[0] as string;
  var tokenDecoded = token === null ? null : jwt<token>(token);

  const menu = () => {
    if (tokenDecoded === undefined || tokenDecoded === null) {
      return (
        <Drawer.Screen name="login" component={Login} />
      );
    }
    else {
      if (tokenDecoded.role === 'Administrador') {
        return (
          <Drawer.Screen name="home" component={Home} />
        );
      }
      else {
        return (
          <Drawer.Screen name="home" component={Home} />
        );
      }
    }
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          {menu()}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;