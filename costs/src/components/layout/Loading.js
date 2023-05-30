import styles from './Loading.module.css'

import loading from '../../img/loading.svg'


function Loading(){
    return(
        <div className={styles.loader_conteiner} >
            <img className={styles.loader} src={loading} alt="Loading" />
        </div>
    )
}

export default Loading