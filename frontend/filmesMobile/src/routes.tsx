import React, { useContext } from 'react';

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

function Routes() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  // Adquirindo propriedades do authContext
  const { logged, IsAdmin, IsComum } = useContext(AuthContext);

  // TODO: PROBLEMA, PROPRIEDADES VINDO UNDEFINED
  console.log('logado? ' +logged + ' é adm? ' + IsAdmin)

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
            // TODO: Caindo sempre no Stack 'Guest' por conta dos booleans que estão undefined's
          */}
          
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

      </AuthProvider>
    </NavigationContainer>
  );
}

export default Routes;