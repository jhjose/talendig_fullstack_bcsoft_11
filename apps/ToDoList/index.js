// Obtener referencias a elementos del DOM
const input = document.getElementById('nueva-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');

// Agregar evento de tecla Enter al input
input.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        agregarTarea();
    }
});

// Función para agregar una nueva tarea
function agregarTarea(){
    const texto = input.value.trim();

    // Validar que el texto no esté vacío
    if(texto === '') return;

    // Crear nuevo elemento de tarea
    const li = document.createElement('li');
    li.className = 'tarea';

    // Crear checkbox para marcar como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function(){
        li.classList.toggle('completada');
        actualizarContador();
    }

    // Crear span para el texto de la tarea
    const span = document.createElement('span');
    span.textContent = texto;

    // Crear botón para eliminar la tarea
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = function(){
        li.remove();
        actualizarContador();
    }

    // Agregar elementos al li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnEliminar);

    // Agregar li a la lista
    listaTareas.appendChild(li);

    // Actualizar contador
    actualizarContador();
}

// Función para actualizar el contador de tareas pendientes
function actualizarContador(){
    const totalTareas = listaTareas.children.length;
    const tareasCompletadas = listaTareas.getElementsByClassName('completada').length;
    const tareasPendientes = totalTareas - tareasCompletadas;

    contador.textContent = `Tareas pendientes: ${tareasPendientes}`;
}