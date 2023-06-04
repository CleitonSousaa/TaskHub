import {  v4 as uuidv4 } from 'uuid'



import styles from './Projeto.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../layout/Loading'
import Conteiner from '../layout/Container'
import Form from '../project/Form'
import Message from '../layout/message'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'



function Projeto(){

    const { id} = useParams()

    const[Project, setProject] = useState([])
    const[services, setServices] = useState([])
    const [showProjectForm, setProjectForm] = useState(false)
    const [showServiceForm, setServiceForm] = useState(false)
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
            setServices(data.services)
        }).catch(err => console.log(err))
        }, 300)
    }, [id])

    function editPost(Project){
        setMessage('')
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
    function createService(Project){
        
        const lastService = Project.services[Project.services.length - 1];

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(Project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(Project.budget)){
            setMessage('O orçamento utrapassado, verifique o valor do serviço!')
            setType('error')
            Project.services.pop()
            return false
        }

        Project.cost = newCost

        fetch(`http://localhost:5001/projects/${Project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Project)
        }).then(res => res.json())
        .then((data) => {
            //exibir os servicos
            console.log(data)

        }).catch(err => console.log(err))
    }

    function removeService(id, cost){
        const servicesUpdate = Project.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = Project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5001/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(res => res.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso !')

        }).catch(err => console.log(err))

    }

    function toggleProjectForm(){
        setProjectForm(!showProjectForm)

    }
    function toggleServiceForm(){
        setServiceForm(!showServiceForm)

    }

    

    return(
        <>
        {Project.name ? (
        <div className={styles.project_details}>
            <Conteiner customClass="ConteinerGeral">
            
                {message && <Message type={type} msg={message} /> }
                <div >
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

                    <div className={styles.service_form_conteiner}>
                        <h3>Adicione um Serviços:</h3>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                                {showServiceForm &&(
                                        <ServiceForm handleSubmit={createService} btnText="Adicionar serviço" projectData={Project}/>
                                    ) 
                                }
                        </div>
                    </div>
                </div>
                
                <Conteiner customClass="Servicos" >
                    <h2>Serviços</h2>
                    {services.length > 0 &&                       
                        services.map((service) => (
                            <ServiceCard    id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.descricao}
                                            key={service.id}
                                            handleRemove={removeService} />
                        ))}

                    {services.length === 0 && <p>não ha serviços cadastrados</p>}
                </Conteiner>

            </Conteiner>
        </div>
        ): (
            <Loading/>
        )}
        </>
    )
}

export default Projeto