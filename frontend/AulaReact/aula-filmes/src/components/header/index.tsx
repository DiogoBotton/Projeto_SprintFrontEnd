import React from 'react';
// É necessário o useHistory para enviar (empurrar/push) o usuário para alguma página específica
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './style.css';
import '../../assets/styles/global.css';
import jwt from 'jwt-decode';

// Interface para obter propriedades do payload do token facilmente
interface token {
  email: string,
  unique_name: string,
  jti: number,
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
  iss: string,
  aud: string
}

// Interface typescript
interface HeaderProps {
  description: string;
  text?: string;
}

// Arrow Function que usa uma interface que vira com propriedades (props) (typescript) FC: FunctionComponent
const Header: React.FC<HeaderProps> = (props) => {
  // history para enviar usuário à uma página específica
  let history = useHistory();

  const token = localStorage.getItem('token-usuario');

  // Verifica se o token é nulo para poder decodifica-lo (necessidade do TypeScript)
  var tokenDecoded = token === null ? null : jwt<token>(token);

  // Botão logout
  const logout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token-usuario');

    // Envia usuário para home
    history.push('/login');
  }

  // Menu que será renderizado se usuário esta logado ou não
  const menu = () => {
    // Token será null ou undefined quando usuário não estiver logado
    if (token === undefined || token === null) {
      return (
        <ul>
          <li><Link className="link" to="/">Home</Link></li>
          <li><Link className="link" to="/login">Login</Link></li>
          <li><Link className="link" to="/cadastro">Cadastro</Link></li>
        </ul>
      );
    }
    else {
      if (tokenDecoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Administrador") {
        return (
          <ul>
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/perfil">Perfil</Link></li>
            <li><Link className="link" to="/filmesAdm">Filmes</Link></li>
            <li><Link className="link" to="/generos">Generos</Link></li>

            <li><Link className="link" to="" onClick={event => {
              event.preventDefault();
              logout()
            }}>Logout</Link></li>
          </ul>
          );
      }
      else {

        return (
          <ul>
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/perfil">Perfil</Link></li>
            <li><Link className="link" to="/filmes">Filmes</Link></li>

            <li><Link className="link" to="" onClick={event => {
              event.preventDefault();
              logout()
            }}>Logout</Link></li>
          </ul>
        );
      }
    }
  }

  return (
    <div className="principal">
      <header>
        <div className="barra">
          <nav className="menu">
            <Link to="/"><img src={logo} alt="Logo Aplicação" className="logo" /></Link>
            {menu()}
          </nav>
          <h3>{props.description}</h3>

          {/* PROPS NÃO OBRIGATÓRIA*/}
          {/* Verifica se a props TEXT existe E se o paragrafo com a props text foi chamada em alguma página */}
          {props.text && <p>{props.text}</p>}
        </div>
      </header>
    </div>
  );
}

export default Header;
