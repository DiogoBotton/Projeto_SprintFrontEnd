import React from 'react';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer } from '@react-navigation/native';

// Menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import Login from './pages/Login/index';
import Home from './pages/Home/index';

// Jwt Decode
import jwt from './services/auth';

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

  var tokenDecoded: any = jwt() === null ? null : jwt();

  // Este menu não está sendo utilizado
  const menu = () => {
    if (tokenDecoded === undefined || tokenDecoded === null) {
      return (
        <Drawer.Navigator initialRouteName="login">
          <Drawer.Screen name="login" component={Login} />
        </Drawer.Navigator>
      );
    }
    else {
      if (tokenDecoded.role === 'Administrador') {
        return (
          <Drawer.Navigator>
            <Drawer.Screen name="home" component={Home} />
          </Drawer.Navigator>
        );
      }
      else {
        return (
          <Drawer.Navigator>
            <Drawer.Screen name="home" component={Home} />
          </Drawer.Navigator>
        );
      }
    }
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {menu()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;