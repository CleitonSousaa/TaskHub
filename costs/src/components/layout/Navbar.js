import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import Conteiner from './Container'

import logo from '../../img/costs_logo.png'
//<li><Link to="/NovoProjeto">Novo Projeto</Link></li>
function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Conteiner>
            <div className={styles.navegacao}>
                <img src={logo} alt="logo" className={styles.logo} />
                <ul className={styles.list}>
                    <li className={styles.item}><Link exact="true" to="/">Inicio</Link></li>
                    <li className={styles.item}><Link exact="true" to="/Empresa">Empresa</Link></li>
                    <li className={styles.item}><Link exact="true" to="/Contato">Contato</Link></li>
                    <li className={styles.item}><Link exact="true" to="/Projetos">Projetos</Link></li> 
                </ul>
            </div>
            
            </Conteiner>
        </nav>
    )
}

export default Navbar