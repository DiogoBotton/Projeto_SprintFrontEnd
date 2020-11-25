import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { decode, encode } from 'base-64';
import Routes from './src/routes';

// Importação global de atob para decodificar token
if (! global.btoa) {global.btoa = encode}
if (! global.atob) {global.atob = decode}

function App() {
  return (
    <Routes />
  );
}

export default App;
