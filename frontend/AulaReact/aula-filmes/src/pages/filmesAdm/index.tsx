import React, { useEffect, useState } from 'react';

import imgRefresh from '../../assets/images/refresh.png';
import imgTrash from '../../assets/images/trash.png';
import logoCinema from '../../assets/images/cinema.png';
import Button from '../../components/button';

import Footer from '../../components/footer';
import Header from '../../components/header';
import Input from '../../components/input';

import './style.css';

function Filme() {

  //prop string genero {get; set;} = "";
  const [idGenero, setIdGenero] = useState(0);
  const [genero, setGenero] = useState('');

  const [generos, setGeneros] = useState([]);

  const [idFilme, setIdFilme] = useState(0);
  const [filme, setFilme] = useState('');

  const [filmes, setFilmes] = useState([]);

  //useEffect te permite executar efeitos colaterais em componentes funcionais
  //Buscar dados é um exemplo de efeito colateral
  //usando o useEffect informo ao React que o componente somente depois da renderização
  //é executado depois da renderização do componente, quando ele já estiver montado na DOM
  useEffect(() => {
    listarFilme();
  }, []);

  useEffect(() => {
    listarGenero();
  }, []);

  const listarFilme = () => {
    fetch('http://localhost:5000/api/filmes', {
      method: 'GET',
      headers: {
        //Bearer authentication é o token authentication, um Schema para autenticação HTTP 
        //O Bearer identifica recursos protegidos por um OAuth2.
        authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      }
    })
      .then(response => response.json())
      .then(data => {
        setFilmes(data);
      })
      .catch(err => console.error(err));
  }

  const listarGenero = () => {
    fetch('http://localhost:5000/api/generos', {
      method: 'GET',
      headers: {
        //Bearer authentication é o token authentication, um Schema para autenticação HTTP 
        //O Bearer identifica recursos protegidos por um OAuth2.
        authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      }
    })
      .then(response => response.json())
      .then(data => {
        setGeneros(data);
      })
      .catch(err => console.error(err));
  }

  const remove = (id: number) => {
    if (window.confirm('Deseja excluir o Filme?')) {
      fetch('http://localhost:5000/api/filmes/' + id, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token-usuario')
        }
      })
        .then(response => response.json())
        .then(data => {
          listarFilme();
        })
        .catch(err => console.error(err));
    }
  }

  const refresh = (id: number) => {
    fetch('http://localhost:5000/api/filmes/' + id, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      }
    })
      .then(response => response.json())
      .then(data => {
        setIdFilme(data.idFilme);
        setGenero(data.titulo);
      })
      .catch(err => console.error(err));
  }

  const salvar = () => {
    const form = {
      titulo: filme,
      // DUVIDA PARA A PROF: PERGUNTAR SOBRE O SELECT
      idGenero: parseInt(genero)
    };

    const method = (idFilme === 0 ? 'POST' : 'PUT');
    const urlRequest = (idFilme === 0 ? 'http://localhost:5000/api/filmes' : 'http://localhost:5000/api/filmes/' + idFilme);

    fetch(urlRequest, {
      method: method,
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token-usuario')
      }
    })
      .then(() => {
        alert('Filme cadastrado');
        setIdGenero(0);
        setIdFilme(0);
        setGenero('');
        setFilme('');
        listarFilme();
        listarGenero();
      })
      .catch(err => console.error(err));
  }



  return (
    <div>
      <Header description="Cadastre os filmes de sua preferência" />

      <div className="conteudo">
        <div className="box-title">
          <h1>Filmes</h1>
          <img className="centralizarIMG" src={logoCinema} alt="Logo de cinema" />
        </div>

        <div className="box-listar-filme">
          <h3>Lista de Filmes</h3>
        </div>

        <table id="table-filmes" className="content-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Filme</th>
              <th>Gênero</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {
              filmes.map((item: any) => {
                return (
                  <tr className="active-row" key={item.idFilme}>
                    <td>{item.idFilme}</td>
                    <td>{item.titulo}</td>
                    <td>{item.genero.nome}</td>
                    <td>
                      <img className="icon" src={imgRefresh} alt="Logo de refresh" onClick={() => refresh(item.idFilme)} />
                      <img className="icon" src={imgTrash} alt="Logo de lixo" onClick={() => remove(item.idFilme)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <form onSubmit={event => {
          event.preventDefault();
          salvar();
        }}>

          <div className="cadastro">
            <div className="box-cadastro-filme">

              <Input type="text" name="filme" label="Cadastrar Filme" value={filme} onChange={e => setFilme(e.target.value)} />

              <select name="genero" onChange={e => setGenero(e.target.value)} value={genero}>
                <option value="0">Selecione um Gênero</option>
                {
                  generos.map((item: any) => {
                    return <option value={item.idGenero}>{item.nome}</option>
                  })
                }
              </select>
            </div>

            <div className="btn">
              <Button name="Salvar" />
            </div>
          </div>
        </form>

      </div>
      <Footer />
    </div>

  );
}

export default Filme;