import styles from './Projeto.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Projeto(){

    const { id} = useParams()

    const[Project, setProject] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5001/projects/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then((data) => {
            setProject(data)
        }).catch(err => console.log(err))
    }, [id])
    

    return(
        <p>{Project.name}</p>
    )
}

export default Projeto