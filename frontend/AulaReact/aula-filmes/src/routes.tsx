import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Cadastro from './pages/cadastro/index'
import Home from './pages/home/index'
import Login from './pages/login/index'
import FilmesClass from './pages/filmesWithClass/filmes';
import Filmes from './pages/filmes/filmes';
import Generos from './pages/generos/generos';
import Perfil from './pages/perfil/perfil';

function Routes() {
  return (
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro" component={Cadastro}/>
        <Route path="/filmesClass" component={FilmesClass}/>
        <Route path="/filmes" component={Filmes}/>
        <Route path="/perfil" component={Perfil}/>
        <Route path="/generos" component={Generos}/>
      </BrowserRouter>
  );
}

export default Routes;
