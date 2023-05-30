import {BrowserRouter as Router,Routes, Route } from 'react-router-dom'

import Inicio from './components/pages/Inicio';
import Empresa from './components/pages/Empresa';
import Contato from './components/pages/Contato';
import NovoProjeto from './components/pages/NovoProjeto';
import Projetos from './components/pages/Projetos';
import Projeto from './components/pages/Projeto'; 

import Navbar from './components/layout/Navbar'
import Conteiner from './components/layout/Container'
import Rodape from './components/layout/Rodape'


function App() {
  return (
    <Router>
        <Navbar/>
        <Conteiner customClass="min-heigth">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Empresa" element={<Empresa />} />
            <Route path="/Contato" element={<Contato />} />
            <Route path="/Projetos" element={<Projetos />} />
            <Route path="/NovoProjeto" element={<NovoProjeto />} /> 
            <Route path="/Projeto/:id" element={<Projeto />} /> 
          </Routes>
        </Conteiner>
        <Rodape/>
      </Router>

      
  );
}


export default App;
