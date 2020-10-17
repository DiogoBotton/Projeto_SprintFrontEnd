import React, { useState } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index'
import { useHistory } from 'react-router-dom';
import '../../assets/styles/global.css';

function Login() {
  let history = useHistory();

  //const initFormData = { email: '', senha: '' };
  //const [formData, setFormData] = useState(initFormData);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
      <Header description="Faça o Login e conheça nossa Coletânea" />
      <div className="centro">
        <div>
          <h1>Login</h1>
          {/*Target seria o atributo que aciona o evento, 
            Event, abre o componente que foi acionado o evento em si, para que possa ser manipulado pelo target*/}
          <form className="form-container" onSubmit={event => {
            // Padrão de comportamento (prevenindo o comportamento padrão de eventos)
            event.preventDefault()
            login()
          }}>
            <Input type="text" label="Email" name="email" onChange={e => setEmail(e.target.value)} />
            <Input type="password" label="Senha" name="senha" onChange={e => setSenha(e.target.value)} />

            <Button name="Enviar" type="submit" />
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
