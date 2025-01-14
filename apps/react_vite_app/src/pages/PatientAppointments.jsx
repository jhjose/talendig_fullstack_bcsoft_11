import {useState} from "react";
import AppointmentForm from "../components/PatientAppointments/AppointmentForm";
import AppointmentList from "../components/PatientAppointments/AppointmentList";

export default function PatientAppointments(){
    const [appointments, setAppointments] = useState([]); // Manejo de estado

    // Función para agregar una cita
    const addAppointment = (newAppintment) => {
        setAppointments([...appointments, { id: Date.now(), ...newAppintment }]);
    }

    // Función para eliminar una cita
    const deleteAppointment = (id) => {
        const updatedAppointments = appointments.filter((appt) => appt.id !== id);
        setAppointments(updatedAppointments);
    }

    return (
        <div className="app-container">
            <h1>Gestor de Citas Médicas</h1>
            <AppointmentForm addAppointment={addAppointment} />
            <AppointmentList appointments={appointments} deleteAppointment={deleteAppointment} />
        </div>
    )
}