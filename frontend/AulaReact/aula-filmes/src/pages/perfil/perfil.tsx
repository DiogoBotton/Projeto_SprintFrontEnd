import React, { useState } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import api from '../../services/services';

function Perfil() {
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
      permissao: permissao
    }

    api
      .post(`Usuarios/${idUsuario}`, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        if(resp.status === 201){
          alert(`Usuário alterado com sucesso`)
        }
        else{
          alert('Houve um erro na alteração do seu usuário')
        }
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
