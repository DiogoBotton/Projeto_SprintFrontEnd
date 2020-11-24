import React, { Component } from 'react';
import api from '../../services/services'
import Header from '../../components/header/index'
import Footer from '../../components/footer/index'

export default class Filmes extends Component {
    // State com array filmes vazia
    state = {
        filmes: [],
    }

    // Executa logo quando carrega a página
    componentDidMount() {
        this.getFilmes();
    }

    // Método para buscar todos os filmes da API
    getFilmes = async () => {
        const response = await api.get('filmes')

        // Acrescentando todos os filmes no array filmes
        this.setState({ filmes: response.data })
        console.log(this.state.filmes)
    }

    // Renderização da página
    render() {
        return (
            <div>
                <Header description="Filmes da plataforma" />
                <div className="table-responsive">
                    <h3>Lista de Filmes</h3>
                    <input type="text" className="form-control" id="busca" placeholder="Filtre por nome do filme" />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#Id</th>
                                <th scope="col">Título</th>
                                <th scope="col">Genero</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filmes.map(filme => (
                               <tr>
                                   {/* 
                                        Não funciona
                                   <td>{filme.idFilme}</td>
                                   <td>{filme.titulo}</td>
                                   <td>{filme.genero}</td> 
                                   */}
                               </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        );
    }
}