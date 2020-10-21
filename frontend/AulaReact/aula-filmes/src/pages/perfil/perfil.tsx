import React, { useState } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import api from '../../services/services';
import jwtService from '../../services/tokenDecoder';
import jwt from 'jwt-decode';

interface token {
  email: string,
  unique_name: string,
  jti: number,
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string,
  iss: string,
  aud: string
}

const Perfil = () => {
  const [idUsuario, setIdUsuario] = useState(0);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [permissao, setPermissao] = useState('');

  const url = 'http://localhost:5000/api/';

  const select = ['Administrador', 'Comum']

  const alterarUsuario = () => {
    const form = {
      nome: nome,
      email: email,
    }

    if (form.nome.length === 0 || form.email.length === 0) return alert('Você não pode deixar os campos de nome ou email vazios.')
    //var tokenDecoded = jwtService();
    //if (tokenDecoded == null) return alert('Usuário não está logado ou sessão expirada');

    // setIdUsuario(tokenDecoded.jti);

    // console.log(tokenDecoded);

    var token = localStorage.getItem('token-usuario');

    if (token == null) return alert('Usuário não está logado ou sessão expirada');
    console.log(jwt<token>(token)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])

    var id: number = jwt<token>(token).jti;
    //Altera o ID do usuário do token
    setIdUsuario(id)

    fetch(`http://localhost:5000/api/Usuarios/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      },
      body: JSON.stringify(form)
    })
      .then(resp => resp.json())
      .then(data => {
        alert('Usuario alterado')
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Header description="Perfil" />

      <div className="centro">
        <form className="form-container" onSubmit={event => {
          event.preventDefault()
          alterarUsuario();
        }}>
          <h1>Perfil</h1>

          <Input type="text" label="Nome" name="nome" onChange={e => setNome(e.target.value)} />
          <Input type="text" label="Email" name="email" onChange={e => setEmail(e.target.value)} />

          <Button name="Enviar" type="submit" />
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Perfil;
