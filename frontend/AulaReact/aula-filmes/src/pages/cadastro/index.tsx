import React, { useState } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import { useHistory } from 'react-router-dom';
import api from '../../services/services';

function Cadastro() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [permissao, setPermissao] = useState('');

  const url = 'http://localhost:5000/api/';

  const select = ['Administrador', 'Comum']

  const cadastrarUsuario = () => {
    const form = {
      nome: nome,
      email: email,
      senha: senha,
      permissao: permissao
    }

    api
      .post('Usuarios', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        if(resp.status === 201){
          alert(`Usuário ${resp.data.nome} cadastrado com sucesso`)
          login()
        }
        else{
          alert('Houve um erro no cadastro de usuário')
        }
      })
      .catch(error => console.log(error))
  }

  const login = () => {
    const login = {
      email: email,
      senha: senha
    };

    const init = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }

    fetch('http://localhost:5000/api/conta/login', init)
      .then(resp => resp.json())
      .then(data => {
        // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
        if (data.token !== undefined) {
          localStorage.setItem('token-usuario', data.token)
          setNome('');
        setEmail('');
        setSenha('');
          // Envia (empurra) pra uma página específica
          history.push('/');
        }
        else {
          // Erro caso email ou senha sejam inválidos
          alert(data)
        }
      })
      .catch(erro => console.log(erro))
  }

  return (
    <div>
      <Header description="Faça o Cadastro para o acesso" />

      <div className="centro">
        <form className="form-container" onSubmit={event => {
          event.preventDefault()
          cadastrarUsuario();
        }}>
          <h1>Cadastro</h1>

          <Input type="text" label="Nome" name="nome" onChange={e => setNome(e.target.value)} />
          <Input type="text" label="Email" name="email" onChange={e => setEmail(e.target.value)} />

          <label htmlFor="select">Selecione uma permissão</label>
          <select className="form-control" id="select" onChange={e => setPermissao(e.target.value)}>
            <option value="0" disabled={true}>Selecione uma permissão</option>
            {
              select.map((item: any) => {
                return <option value={item}>{item}</option>
              })
            }
          </select>

          <Input type="password" label="Senha" name="senha" onChange={e => setSenha(e.target.value)} />

          <Button name="Enviar" type="submit" />
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Cadastro;
