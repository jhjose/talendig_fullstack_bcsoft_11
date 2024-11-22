// Almacenamiento en memoria
let debates = [];

// Función para renderizar los debates
function renderDebates(){
    const container = document.getElementById('debatesContainer');
    container.innerHTML = debates.map(debate => `
        <div class="debate">
            <div class="metadata">
                Publicado por ${debate.username} el ${debate.timestamp}
            </div>
            <div class="debate-title">${debate.title}</div>
            <div class="debate-content">${debate.content}</div>

            <div class="comments">
                ${debate.comments.map(comment => 
                    `<div class="metadata">
                        Comentado por ${comment.username} el ${comment.timestamp}
                    </div>
                    ${comment.content}
                `).join('')}

                <div class="comment-form">
                    <input type="text" id="commentUsername-${debate.id}" 
                        placeholder="Tu nombre de usuario">
                    <textarea id="commentContent-${debate.id}" placeholder="Tu comentario" rows="2"></textarea>   
                    <button onclick="handleAddComment(${debate.id})">Comentar</button>  
                </div>
            </div>
        </div>
    `).join('');
}

// Función para crear debates
function handleCreateDebate(){
    const username = document.getElementById('username').value;
    const title = document.getElementById('debateTitle').value;
    const content = document.getElementById('debateContent').value;

    if(!username || !title || !content){
        alert('Por favor, completa todos los campos');
        return;
    }

    const debate = {
        id: Date.now(),
        username,
        title,
        content,
        timestampo: new Date().toLocaleString(),
        comments: [],
    }

    debates.unshift(debate);
    renderDebates();

    // Limpiar campos
    document.getElementById('username').value = '';
    document.getElementById('debateTitle').value = '';
    document.getElementById('debateContent').value = '';
}

// Función para agregar comentario
function handleAddComment(debateId){
    const username = document.getElementById(`commentUsername-${debateId}`).value;
    const content = document.getElementById(`commentContent-${debateId}`).value;

    if(!username || !content){
        alert('Por favor, completa todos los campos del comentario.');
        return;
    }

    const debate = debates.find(d => d.id === debateId);

    if(debate){
        debate.comments.push({
            id: Date.now(),
            username,
            content,
            timestamp: new Date().toLocaleString(),
        });
        renderDebates();
    }

    // Limpiar los campos
    document.getElementById(`commentUsername-${debateId}`).value = '';
    document.getElementById(`commentContent-${debateId}`).value = '';
}

// Agregar evento al botón de crear debate
document.getElementById('createDebateBtn').addEventListener('click', handleCreateDebate);

// Cargar algunos debates de ejemplo
debates = [
    {
        id: 1,
        username: 'Admin',
        title: "Debate de ejemplo",
        content: 'Este es un debate de ejemplo para mostrar cómo funciona el foro.',
        timestamp: new Date().toLocaleString(),
        comments: [
            {
                id: 2,
                username: 'UserIA',
                content: 'Muy interesante! Gracias por compartir',
                timestamp: new Date().toLocaleString()
            },
        ],
    },
];

// Renderizar debates iniciales
renderDebates();