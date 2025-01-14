import {Link} from "react-router-dom";
import '../styles/nav.css';

const Nav = ()=>{
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Inicio</Link>
                </li>
                <li>
                    <Link to={'/about'}>Acerca de</Link>
                </li>
                <li>
                    <Link to={'/contact'}>Contacto</Link>
                </li>
                <li>
                    <Link to={'/appointments'}>Citas</Link>
                </li>
                <li>
                    <Link to={'/material'}>Material UI </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;