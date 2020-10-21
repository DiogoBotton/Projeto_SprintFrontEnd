import React, { useState, useEffect } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Cinema from '../../assets/images/cinema.png';
import api from '../../services/services';
import './style.css';

const Filmes = () => {
    // Explicação: 1° paramêtro se refere à VARIAVEL que será armazenado algum dado, e o 2° paramêtro ao MÉTODO que ATUALIZARÁ o dado.

    // Variavel com matriz de filmes, com o método que atualizará a lista
    const [filmes, updateFilmes] = useState([]);

    // 2 listas de filmes pois é preciso para fazer o filtro
    // OBS. com VAR a lista não atualiza, e não funciona com o useEffect
    const[listFilmes, setFilmes] = useState(filmes);

    // Variavel filter (para filtrar os filmes por nome)
    const [filter, setFilter] = useState('');

    // Variavel que define se a página esta carregando
    const [isLoading, updateIsLoading] = useState(true)

    // Variavel com string de erro, inicia com string vazia
    const [erro, updateErro] = useState('');

    // O useEffect é parecido com o componentDidMount (executa após a renderização do componente/página), e outros...
    // 3 fases: Quando monta, quando altera, e quando desfaz

    // 1° paramêtro seria a função à ser executada, o 2° paramêtro seria a qual condição será executado
    // com [] (matriz vazia) significa que irá ser executado apenas uma vez (quando a página for carregada)
    // com [conteudo] significa que irá ser executado sempre quando a variavel "conteúdo" houver uma alteração
    useEffect(() => {
        api
            .get('filmes', {
                headers: {
                    // Acrescenta o authorization (token) para ser autenticado na API
                    Authorization: 'Bearer ' + localStorage.getItem('token-usuario'),
                    'Content-Type': 'application/json'
                },
            })
            .then(resp => {
                // Caso não dê erro, atualiza lista de filmes
                updateFilmes(resp.data);
                setFilmes(resp.data)
                updateIsLoading(false)
            })
            .catch(erro => {
                // Caso dê erro, exibe a mensagem de erro
                updateErro(erro.message);
                updateIsLoading(false)
            })
    }, [])

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de filmes
        let filmesFilter = filmes.filter((filme: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de filmes
            if (filter.length === 0)
                return filmes;

            // Retorna todos os filmes com nomes semelhantes ao filtro digitado
            return filme.titulo.toLowerCase().includes(filter.toLowerCase());
        })

        setFilmes(filmesFilter);
    }, [filter])

    // Renderiza todos os filmes
    const filmesRender = () => {
        return (
            <tbody>
                {listFilmes.map((filme: any) => {
                    return (
                        <tr key={filme.idFilme}>
                            <td>{filme.idFilme}</td>
                            <td>{filme.titulo}</td>
                            <td>{filme.genero.nome}</td>
                            <td></td>
                        </tr>
                    );
                })}
            </tbody>
        );
    }

    // ERRO: Executa o useEffect 4 vezes ou mais
    return (
        <div>
            <Header description="Filmes da plataforma" />
            <h1>{erro}</h1>
            <h1>Filmes</h1>
            <div className="centro">
                <img src={Cinema} alt="" />
            </div>
            <div className="table-responsive">
                <div className="filter-container">
                    <div className="filter">
                        <Input label="Filtre por nome um filme" name="filter" onKeyUp={e => setFilter(e.currentTarget.value)} />
                    </div>
                    <div>
                        <h3>Filmes</h3>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Nome</th>
                            <th>Gênero</th>
                        </tr>
                    </thead>
                    {filmesRender()}
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Filmes;