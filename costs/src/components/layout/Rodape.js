import styles from './Rodape.module.css'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

function Rodape(){
    return(
    <footer className={styles.footer}>
        <ul className={styles.social}>
            <li>
                <FaFacebook/>
            </li>
            <li>
                <FaInstagram/>
            </li>
            <li>
                <FaLinkedin/>
            </li>
            
        </ul>
        <p className={styles.copy}>
            <span>@TaskHub</span>
        </p>
        
    </footer>
    )
}

export default Rodape