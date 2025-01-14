import {useState} from "react";

function AppointmentForm({addAppointment}){
    // Hook
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        symptoms: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!formData.name || !formData.date || !formData.time || !formData.symptoms){
            alert('Por favor, completa todos los campos');
            return;
        }

        addAppointment(formData);

        // Limpia el formulario
        setFormData({name: '', date: '', time: '', symptoms: ''});

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear cita</h2>
            <div style={{paddinTop: 10}}>
                <label htmlFor="name">Nombre del paciente:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} 
                    placeholder="Nombre del paciente" />
            </div>
            
            <div style={{marginTop: 20}}>
                <label htmlFor="name">Fecha:</label>    
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>

            <div style={{marginTop: 20}}>
                <label htmlFor="time">Hora:</label>    
                <input type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>

            <div style={{marginTop: 20}}>
                <label htmlFor="symptoms">Síntomas:</label>    
                <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} 
                    placeholder="Describa los síntomas"/>
            </div>

            <div style={{marginTop: 10}}>
                <button type="submit">Agregar Cita</button>
            </div>
        </form>
    )
}

export default AppointmentForm;