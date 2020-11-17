/* eslint-disable prettier/prettier */
import React from 'react-native';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer } from '@react-navigation/native';

// Menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';

// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import Login from './src/pages/Login/index';
import Home from './src/pages/Home/index';

// Jwt Decode Native
import jwt from 'react-native-pure-jwt';

interface token {
  email: string,
  unique_name: string,
  jti: number,
  role: string,
  iss: string,
  aud: string
}

function Routes() {
  const Drawer = createDrawerNavigator();

  const token = AsyncStorage.getItem('token-usuario');
  // AINDA NÃO TA FUNCIONANDO
  var tokenDecoded = token === null ? null : jwt<token>(token);

  const menu = () => {

  }

  return (

    );
}

export default Routes;