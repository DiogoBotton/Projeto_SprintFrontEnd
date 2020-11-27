import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { decode, encode } from 'base-64';
import Routes from './src/routes';

// Container que englobará todas os tipos de navegação
import { NavigationContainer } from '@react-navigation/native';

// Auth Context
import { AuthProvider } from './src/context/auth';

// Importação global de atob para decodificar token
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
