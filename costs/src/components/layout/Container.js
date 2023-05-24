import styles from './Conteiner.module.css'

function Conteiner(Props){
    return <div className={`${styles.conteiner} ${styles[Props.customClass]}`}>{Props.children}</div>
    
}

export default Conteiner