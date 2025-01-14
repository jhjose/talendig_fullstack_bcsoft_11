import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import Page404 from "./pages/Page404";
import PatientAppointments from "./pages/PatientAppointments";
import GeneralMaterial from './pages/MaterialUI/GeneralMaterial';

export default function RoutesConfig(){
    return (
        <Router>
            <Nav />
            <Routes>
                {/* Ruta raíz */}
                <Route path="/" element={<Home />} />

                <Route path="*" element={<Page404/>} /> 

                {/* Ruta 'About' */}
                <Route path="/about" element={<About />} />

                {/* Ruta 'Contact' */}
                <Route path="/contact" element={<Contact />} />
                
                <Route path="/appointments" element={<PatientAppointments />} />

                <Route path="/material" element={<GeneralMaterial  />} />

            </Routes>
        </Router>
    )
}