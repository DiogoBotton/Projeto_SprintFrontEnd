import React from 'react';

// Pois sempre que vamos fazer navegação em pilha, é necessário essa tag por volta, como veremos a frente
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// Menu lateral
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pages
import Login from './pages/Login/index';
import Home from './pages/Home/index';

// Jwt Decode
import jwt from './services/auth';

function Routes() {

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const Adm = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="home"
          component={Home}
        />
      </Drawer.Navigator>
    );
  }

  const Comum = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="home"
          component={Home}
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