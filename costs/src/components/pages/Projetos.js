import {useLocation} from 'react-router-dom'

import Message from "../layout/message"
import Conteiner from "../layout/Container"
import LinkBottun from '../layout/LinkButton'

import styles from './Projetos.module.css'


function Projetos(){

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    return (
        <div className={styles.project_conteiner}>
            <div className={styles.title_conteiner}>
               <h1>Projetos</h1> 
               <LinkBottun to="/NovoProjeto" text="Criar Projetos"/>
            </div>
            {message && <Message type="success" msg={message}  /> }
            <Conteiner customClass="start">
                <p>Projetos...</p>
            </Conteiner>
        </div>
    )
    
}
export default Projetos