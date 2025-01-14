import AppointmentItem from "./AppointmentItem";

function AppointmentList({appointments, deleteAppointment}){
    return (
        <div className="appointment-list">
            <h2>Listado de Citas</h2>
            {
                appointments?.length === 0 ? (
                    <p>No hay citas programadas</p>
                ) : <AppointmentItem key={appoitment?.id} appointment={appointment} deleteAppointment={deleteAppointment} />
            }
        </div>
    )
}

export default AppointmentList;