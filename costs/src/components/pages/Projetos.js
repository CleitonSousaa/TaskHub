import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Message from "../layout/message"
import Conteiner from "../layout/Container"
import LinkBottun from '../layout/LinkButton'

import styles from './Projetos.module.css'
import ProjetosCard from '../project/ProjetosCard'



function Projetos(){

    const [Projetos, setProjetos] = useState([])


    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }


    useEffect(() => {

        fetch('http://localhost:5001/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            
            setProjetos(data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.project_conteiner}>
            <div className={styles.title_conteiner}>
               <h1>Projetos</h1> 
               <LinkBottun to="/NovoProjeto" text="Criar Projetos"/>
            </div>
            {message && <Message type="success" msg={message}  /> }
            <Conteiner customClass="start">
                {Projetos.length > 0 && 
                Projetos.map((Projetos) => (
                    <ProjetosCard   id={Projetos.id}
                                    name={Projetos.name}
                                    budget={Projetos.budget}
                                    category={Projetos.category.name}
                                    key={Projetos.id}

                                     />
                ))}
                
            </Conteiner>
        </div>
    )
    
}
export default Projetos