import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/index'
import Home from './pages/home/index'
import Login from './pages/login/index'
import Filmes from './pages/filmes/filmes';
import Generos from './pages/generos/generos';
import Perfil from './pages/perfil/perfil';
import FilmesAdm from './pages/filmesAdm/index';
import jwt from './services/tokenDecoder'

function Routes() {
  // Rota privada para impedir usuários de entrarem em páginas quando não logados
  const RotaPrivadaComum = ({ Component, ...rest }: any) => (
    <Route
      {...rest}
      render={props =>
        // Se sim, renderiza de acordo com a rota solicitada e permitida
        // Se não, redireciona para a página de login
        jwt() !== null ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );

  const RotaPrivadaAdm = ({ Component, ...rest }: any) => (
    <Route
      {...rest}
      render={props =>
        // Se sim, renderiza de acordo com a rota solicitada e permitida
        // Se não, redireciona para a página de login
        localStorage.getItem('token-filmes') !== null && jwt().Role === 'Administrador' ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );


  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <RotaPrivadaComum path="/filmes" component={Filmes} />
      <RotaPrivadaAdm path="/filmesAdm" component={FilmesAdm} />
      <RotaPrivadaComum path="/perfil" component={Perfil} />
      <RotaPrivadaAdm path="/generos" component={Generos} />
    </BrowserRouter>
  );
}

export default Routes;
