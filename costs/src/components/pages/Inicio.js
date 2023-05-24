import styles from './Inicio.module.css'
import Savings from '../../img/savings.svg'
import LinkBottun from '../layout/LinkButton'


function Inicio(){
    return (
        <section className={styles.conteiner}>
            <h1>
                Bem-vindo ao <span>TaskHub</span>
                <p>Comece a gerenciar os seus projetos agora mesmo!</p>
                <LinkBottun to="/NovoProjeto" text="Criar Projetos"/>
 
            </h1>
            <img src={Savings} alt="TaskHub"/>
        </section>
    )
}

export default Inicio