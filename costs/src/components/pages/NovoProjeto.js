import { useNavigate } from 'react-router-dom'
import Form from '../project/Form'


import styles from './NovoProjeto.module.css'

function NovoProjeto(){
    
    const history = useNavigate()
    

    function createPost(project){

        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5001/projects", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
            
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/Projetos', { state: { message: 'Projeto criado com sucesso' } });
        })
        .catch(err => console.log(err))
    

    }

    return (
        <div className={styles.conteiner}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )

}

export default NovoProjeto