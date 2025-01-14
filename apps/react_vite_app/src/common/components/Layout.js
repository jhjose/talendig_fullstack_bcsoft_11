import React from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {logout} from '../../store/features/auth/authSlice';

const Layout = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className='app-container'>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/todos">Todos</Link></li>
                    <li><Link to="/profile">Perfil</Link></li>
                    <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;