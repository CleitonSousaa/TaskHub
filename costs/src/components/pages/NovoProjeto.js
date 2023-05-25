import Form from '../project/Form'
import styles from './NovoProjeto.module.css'

function NovoProjeto(){
    
    return (
        <div className={styles.conteiner}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form btnText="Criar Projeto"/>
        </div>
    )

}

export default NovoProjeto