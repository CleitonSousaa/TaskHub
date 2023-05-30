import styles from './Projeto.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Conteiner from '../layout/Container'


function Projeto(){

    const { id} = useParams()

    const[Project, setProject] = useState([])
    const [showProjectForm, setProjectForm] = useState(false)

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

    function toggleProjectForm(){
        setProjectForm(!showProjectForm)

    }
    

    return(
        <>
        {Project.name ? (
        <div className={styles.project_details}>
            <Conteiner customClass="column">
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
                                <p>Detalhes do projeto</p>
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