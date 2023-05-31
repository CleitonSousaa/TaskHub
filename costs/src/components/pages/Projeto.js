import styles from './Projeto.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Conteiner from '../layout/Container'
import Form from '../project/Form'
import Message from '../layout/message'


function Projeto(){

    const { id} = useParams()

    const[Project, setProject] = useState([])
    const [showProjectForm, setProjectForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5001/projects/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then((data) => {
            setProject(data)
        }).catch(err => console.log(err))
        }, 300)
    }, [id])

    function editPost(Project){
        if(Project.budget < Project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5001/projects/${Project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Project)
        }).then(res => res.json())
        .then((data) => {
            setProject(data)
            setProjectForm(false)
            //mensagem
            setMessage('Projeto atualizado')
            setType('Succes')

        }).catch(err => console.log(err))

    }

    function toggleProjectForm(){
        setProjectForm(!showProjectForm)

    }
    

    return(
        <>
        {Project.name ? (
        <div className={styles.project_details}>
            <Conteiner customClass="column">
                {message && <Message type={type} msg={message} /> }
                <div className={styles.details_conteiner}>
                    <h1>Projeto : {Project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        
                    </button>
                    {!showProjectForm ? (
                            <div className={styles.project_info}> 
                                <p>
                                    <span>Categoria:</span>{Project.category.name}
                                </p>
                                <p>
                                    <span>Total do Orçamento: R$ </span>{Project.budget}
                                </p>
                                <p>
                                    <span>Total do Ultilizado: R$ </span>{Project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <Form   handleSubmit={editPost} 
                                        btnText="Concluir Edição" 
                                        projectData={Project}/>
                            </div>
                        )}
                </div>
            </Conteiner>

        </div>
        ): (
            <Loading/>
        )}
        </>
    )
}

export default Projeto