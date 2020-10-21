import React from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import './style.css'
import cinema from '../../assets/images/cinema.png';
import teatro from '../../assets/images/theater.png';
import '../../assets/styles/global.css';
import { Navbar, Nav } from 'react-bootstrap';


function Home() {
  return (
    <div>
      <Header description="Conheça nossa Coletânea" text="Olá, tudo bem?" />

      <h1>Monte sua coletânea de filmes...</h1>
      <div className="intro">
        <h3>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor</h3><br />
        <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit. </p>
      </div>

      <div className="filme-categoria">
        <div>
          <img src={cinema} alt="Cinema" />
          <h3>Filmes</h3><br />
          <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit. </p>
        </div>

        <div>
          <img src={teatro} alt="Teatro" />
          <h3>Categoria</h3><br />
          <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit. </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
