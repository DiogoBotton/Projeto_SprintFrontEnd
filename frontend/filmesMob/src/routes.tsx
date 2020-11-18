/* eslint-disable prettier/prettier */
import React from 'react-native';

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
  const {Navigator, Screen} = createDrawerNavigator();

  // var token = Object.values(AsyncStorage.getItem('token-usuario'))[0] as string;
  // var tokenDecoded = token === null ? null : jwt<token>(token);

  // const menu = () => {
  //   if (tokenDecoded === undefined || tokenDecoded === null) {
  //     return (
  //       <Drawer.Navigator>
  //         <Drawer.Screen name="login" component={Login} />
  //       </Drawer.Navigator>
  //     );
  //   }
  //   else {
  //     if (tokenDecoded.role === 'Administrador') {
  //       return (
  //         <Drawer.Navigator>
  //           <Drawer.Screen name="home" component={Home} />
  //         </Drawer.Navigator>
  //       );
  //     }
  //     else {
  //       return (
  //         <Drawer.Navigator>
  //           <Drawer.Screen name="home" component={Home} />
  //         </Drawer.Navigator>
  //       );
  //     }
  //   }
  // }

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="login" component={Login} />
        <Screen name="home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Routes;