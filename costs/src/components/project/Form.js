import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'

import styles from './Form.module.css'


function Form({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5001/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((resp) => resp.json() )
    .then((data) => {
        setCategories(data)
    })
    .catch(err => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        
    }

    function handleCategory(e) {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === selectedCategoryId);
      
        setProject({
          ...project,
          category: {
            id: selectedCategoryId,
            name: selectedCategory ? selectedCategory.name : ''
          }
        });
      }


    return (
        <form onSubmit={submit} className={styles.form}>
            
            <Input  type="text" 
                        text="Nome do projeto" 
                        name="name" 
                        placeholder="Insira o nome do projeto"
                        handleOnChange={handleChange}
                        value={project.name ? project.name : ''}
                        />
            
            <Input  type="number" 
                        text="Orçamento do projeto" 
                        name="budget" 
                        placeholder="Insira o orçamento total"
                        handleOnChange={handleChange} 
                        value={project.budget ? project.budget : ''}
                        />
            
            <Select name="category_id"
                        text="Selecione a categoria" 
                        options={categories}
                        handleOnChange={handleCategory}
                        value={project.category ? project.category.id : ''} />
            
            <Submit text={btnText}/>
            
        </form>
    )
}

export default Form