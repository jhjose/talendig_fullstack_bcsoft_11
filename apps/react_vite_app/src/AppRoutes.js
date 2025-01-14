import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesConfig from './RoutesConfig';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './RoutesPublic';

// Importación de páginas
import Login from './store/features/Login';
import Register from './store/features/Register';
import Dashboard from './store/features/Dashboard';
import TodoList from './store/features/todos/TodoList';
import UserProfile from './store/features/UserProfile';

function AppRoutes() {
  const isAutheticated = useSelector(state => state.auth.isAutheticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<RoutesPublic isAutheticated={isAutheticated} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<RoutesPrivate isAutheticated={isAutheticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>

        {/* Ruta por defecto y 404 */}
        <Route path='/' element={
          isAutheticated ? <Navigate to="/dashboard" /> : <Navigate to="/login"/>
        }/>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  )

  /*return (
      <RoutesConfig />
  )*/
}

export default AppRoutes;
