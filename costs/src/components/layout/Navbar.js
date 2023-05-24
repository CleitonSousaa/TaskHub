import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import Conteiner from './Container'

import logo from '../../img/costs_logo.png'
//<li><Link to="/NovoProjeto">Novo Projeto</Link></li>
function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Conteiner>
            <Link>
                <img src={logo} alt="logo" className={styles.logo} />
            </Link>
            <ul className={styles.list}>
                <li className={styles.item}><Link exact to="/">Inicio</Link></li>
                <li className={styles.item}><Link exact to="/Empresa">Empresa</Link></li>
                <li className={styles.item}><Link exact to="/Contato">Contato</Link></li>
                <li className={styles.item}><Link exact to="/Projetos">Projetos</Link></li>
                
                
                
                
            </ul>
            </Conteiner>
        </nav>
    )
}

export default Navbar