// Inicializar 5 grupos vacíos
let groups = [[], [], [], [], []];

function addStudent(){
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim();

    if(!studentName){
        alert('Por favor, ingrese un nombre');
        return;
    }

    // Obtener grupos disponibles (con menos de 5 estudiantes)
    const availableGroups = groups.filter(group => group.length < 5);

    if(availableGroups.length === 0){
        alert('No hay grupos disponibles. Todos los grupos están llenos.');
        return;
    }

    // Seleccionar un grupo aleatorio entre los disponibles
    const randomIndex = Math.floor(Math.random() * availableGroups.length);
    const selectedGroup = availableGroups[randomIndex];

    // Encontrar el índice real del grupo seleccionado en el array original
    const realGroupIndex = groups.indexOf(selectedGroup);

    // Agregar estudiante al grupo seleccionado
    groups[realGroupIndex].push(studentName);

    // Limpiar el input
    nameInput.value = '';

    // Actualizar la visualización
    displayGroups();
}

function displayGroups(){
    const container = document.getElementById('groupsContainer');
    container.innerHTML = '';

    groups.forEach((group, index)=>{
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group ' + (group.length >= 5 ? 'full' : 'available');

        const groupTitle = document.createElement('h3');
        groupTitle.textContent = `Grupo ${index + 1} (${group.length}/5)`;
        groupDiv.appendChild(groupTitle);

        const studentList = document.createElement('ul');
        studentList.className = 'student-list';

        group.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student;
            studentList.appendChild(li);
        });

        groupDiv.appendChild(studentList);
        container.appendChild(groupDiv);
    });
}

// Manejar la tecla Enter en el input
document.getElementById('studentName').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        addStudent();
    }
});

// Mostrar los grupos vacíos inicialmente
displayGroups();