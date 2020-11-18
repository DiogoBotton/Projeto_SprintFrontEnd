/* eslint-disable prettier/prettier */
import React from 'react';

// Rotas do react native
import { NativeRouter, Route, Switch } from 'react-router-native';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Login from './src/pages/Login/index';
import Home from './src/pages/Home/index';

//import Routes from './src/routes';

// Rotas diretamente no App
function App() {
  return (
     <NativeRouter>
       <Switch>

         <Route exact path="/" component={Login} />
         <Route exact path="/home" component={Home} />

       </Switch>
    </NativeRouter>
    //<Routes />
  );
}

export default App;