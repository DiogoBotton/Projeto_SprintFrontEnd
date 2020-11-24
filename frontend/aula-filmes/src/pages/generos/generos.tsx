import React, { useState, useEffect } from 'react';
import api from '../../services/services';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import Theater from '../../assets/images/theater.png'
import Refresh from '../../assets/images/refresh.png'
import Trash from '../../assets/images/trash.png'
import './style.css'

function Generos() {
  const [genero, setGenero] = useState('');
  const [idGenero, setIdGenero] = useState(0);
  const [generos, setGeneros] = useState([]);

  const init = {
    headers: {
      // Acrescenta o authorization (token) para ser autenticado na API
      Authorization: 'Bearer ' + localStorage.getItem('token-usuario'),
      'Content-Type': 'application/json'
    },
  }

  // Quando renderiza a página executa uma vez (recebe todos os generos)
  useEffect(() => {
    listar();
  }, [])

  const listar = () => {
    api
      .get('Generos', init)
      .then(resp => {
        setGeneros(resp.data);
      })
      .catch(erro => console.log(erro))
  }

  // Busca gênero por ID para ser atualizado no salvar
  const refresh = (id: number) => {
    api
      .get(`Generos/${id}`, init)
      .then(resp => {
        setIdGenero(resp.data.idGenero);
        setGenero(resp.data.nome);
      })
      .catch(erro => console.log(erro))
  }

  // Quando clica no botão "Salvar"
  const salvar = () => {
    const form = {
      nome: genero,
    }
    console.log('idGenero' + idGenero)

    const method = idGenero === 0 ? 'POST' : 'PUT';
    const url = idGenero === 0 ? 'http://localhost:5000/api/Generos' : `http://localhost:5000/api/Generos/${idGenero}`

    // ATENÇÃO: Com Axios a atualização da lista só funciona dps que atualiza a página, com o Fetch atualiza em tempo real (mesmo com o método listar() no bloco then)
    fetch(url, {
      method: method,
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      }
    })
      .then(() => {
        setIdGenero(0);
        setGenero('');
        listar();
      })
      .catch(err => console.error(err));
  }

  // Quando clica na imagem de lixo
  const trash = (id: number) => {
    api
      .delete(`Generos/${id}`, init)
      .then(resp => {
        setIdGenero(0);
        setGenero('');
        listar()
      })
      .catch(erro => console.log(erro))
  }

  // Listagem dos generos
  const generosRender = () => {
    return (
      <tbody>
        {
          // Listando ITENS com TYPESCRIPT (genero recebe QUALQUER item, necessário para reconhecer as props)
          generos.map((genero: any) => {
            return (
              // Linha com o ID do genero
              <tr key={genero.idGenero}>
                <td>{genero.idGenero}</td>
                <td>{genero.nome}</td>
                <td><img src={Refresh} alt="Refresh" className="icon" onClick={() => refresh(genero.idGenero)} />
                  <img src={Trash} alt="Trash" className="icon" onClick={() => trash(genero.idGenero)} /></td>
              </tr>
            );
          })
        }
      </tbody>
    );
  }

  return (
    <div>
      <Header description="Generos" />

      <h1>Gêneros</h1>
      <div className="img-theater">
        <img src={Theater} alt="Theater" />
      </div>

      <h3>Lista de Gêneros</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-cor">
            <tr>
              <th scope="col">#Id</th>
              <th scope="col">Gênero</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          {generosRender()}
        </table>

        <form className="form" onSubmit={event => {
          event.preventDefault()
          salvar();
        }}>
          <div>
            <Input label="Nome" name="name" onChange={e => setGenero(e.target.value)} />
          </div>
          <div className="btn">
            <Button name="Salvar" type="submit" />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Generos;
