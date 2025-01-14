function AppointmentItem({appointment, deleteAppointment}){
    return (
        <div className="appointment-item">
            <p>
                <strong>Paciente:</strong> {appointment.name}
            </p>
            <p>
                <strong>Fecha:</strong> {appointment.date}
            </p>
            <p>
                <strong>Hora:</strong> {appointment.time}
            </p>
            <p>
                <strong>Síntomas:</strong> {appointment.symptoms}
            </p>
            <button onClick={()=>{deleteAppointment(appointment.id)}}>
                Eliminar Cita
            </button>
        </div>
    )
}

export default AppointmentItem;