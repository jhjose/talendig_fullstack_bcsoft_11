import { io } from 'socket.io-client';
import './styles.css';

const BACKEND_URL = 'http://localhost:3080';

const socket = io(BACKEND_URL);

// Elementos de DOM
const loginScreen = document.getElementById('login-screen');
const quizScreen = document.getElementById('quiz-screen');
const adminPanel = document.getElementById('admin-panel');
const studentNameInput = document.getElementById('student-name');
const joinBtn = document.getElementById('join-btn');
const teacherModeBtn = document.getElementById('teacher-mode-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const votesContainer = document.getElementById('votes-container');
const showAnswerBtn = document.getElementById('show-answer-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const teacherControls = document.getElementById('teacher-controls');

// Elementos de formulario de preguntas
const questionForm = document.getElementById('question-form');
const questionIdInput = document.getElementById('question-id');
const questionInput = document.getElementById('question-input');
const optionsInputs = document.querySelectorAll('.option-input');
const correctAnswerSelect = document.getElementById('correct-answer');
const saveQuestionBtn = document.getElementById('save-question-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const questionsList = document.getElementById('questions-list');

let isTeacherMode = false;
let currentQuestionId = null;

// Selectores para el Login del Modo Profesor
const teacherLogin = document.getElementById('teacher-login');
const teacherPinInput = document.getElementById('teacher-pin');
const submitPinBtn = document.getElementById('submit-pin-btn');
const backToLoginBtn = document.getElementById('back-to-login-btn');

const TEACHER_PIN = '852456';


// Función para cambiar entre pantallas
function showScreen(screen){
    loginScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    adminPanel.style.display = 'none';
    teacherLogin.style.display = 'none';

    screen.style.display = 'block';
}

joinBtn.addEventListener('click', ()=>{
    const studentName = studentNameInput.value.trim();
    
    if(studentName){
        socket.emit('join', studentName);
        showScreen(quizScreen);
    }
});

// Modo profesor
teacherModeBtn.addEventListener('click', async ()=>{
    loginScreen.style.display = 'none';
    teacherLogin.style.display = 'block';
});

backToLoginBtn.addEventListener('click', ()=>{
    teacherLogin.style.display = 'none';
    loginScreen.style.display = 'block';
});

submitPinBtn.addEventListener('click', async ()=>{
    const pin = teacherPinInput.value.trim();

    if(pin === TEACHER_PIN){
        isTeacherMode = true;
        showScreen(adminPanel);
        teacherControls.style.display = 'block';

        await loadQuestions();

        // Limpiar el PIN por seguridad
        teacherPinInput.value = '';
    }
});

// Cargar preguntas del backend
async function loadQuestions(){
    try {
        const response = await fetch(`${BACKEND_URL}/api/questions`);
        const questions = await response.json();

        displayQuestions(questions);
    } catch (error) {
        console.error('Error cargando preguntas:', error);
    }
}

// Mostrar lista de preguntas
function displayQuestions(questions){
    questionsList.innerHTML = '';
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        questionDiv.innerHTML = `
            <p><strong>Pregunta:</strong> ${question.question}</p>
            <p><strong>Opciones:</strong> ${question.options.join(', ')}</p>
            <p><strong>Respuesta correcta:</strong> ${question.correct_answer}</p>
            <button onclick="editQuestion(${question.id})">Editar</button>
            <button onclick="deleteQuestion(${question.id})">Eliminar</button>
        `;

        questionsList.appendChild(questionDiv);
    });
}

// Funciones de gestión de preguntas
window.editQuestion = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/questions/${id}`);
        const question = await response.json();

        questionIdInput.value = question.id;
        questionInput.value = question.question;

        question.options.forEach((option, index)=>{
            optionsInputs[index].value = option;
        });

        updateCorrectAnswerOptions();
        correctAnswerSelect.value = question.correct_answer;

        cancelEditBtn.style.display = 'block';

        document.getElementById('form-title').textContent = 'Editar pregunta';

    } catch (error) {
        console.error('Error cargando pregunta: ', error);
    }
}

window.deleteQuestion = async (id)=>{
    if(confirm('Estás seguro de querer eliminar esta pregunta?')){
        try {
            await fetch(`${BACKEND_URL}/api/questions/${id}`, {
                method: 'DELETE'
            });

            await loadQuestions();
        } catch (error) {
            console.error('Error eliminando pregunta:', error);
        }
    }
}

// Actualizar optiones del select de respuesta correcta
function updateCorrectAnswerOptions(){
    correctAnswerSelect.innerHTML = '';
    Array.from(optionsInputs).forEach(input => {
        if(input.value.trim()){
            const option = document.createElement('option');
            option.value = input.value;
            option.textContent = input.value;
            correctAnswerSelect.appendChild(option);
        }
    });
}

// Eventos para el formulario
optionsInputs.forEach(input => {
    input.addEventListener('input', updateCorrectAnswerOptions);
});

saveQuestionBtn.addEventListener('click', async()=>{
    const options = Array.from(optionsInputs)
        .map(input => input.value.trim())
        .filter(value => value);

    const questionData = {
        question: questionInput.value,
        options,
        correctAnswer: correctAnswerSelect.value,
    };
    console.log('questionData', questionData)
    try {
        const url = questionIdInput.value ? 
            `${BACKEND_URL}/api/questions/${questionIdInput.value}` :
            `${BACKEND_URL}/api/questions`;

        const method = questionIdInput.value ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData)
        });

        resetForm();

        await loadQuestions();
    } catch (error) {
        console.error('Error guardando pregunta: ', error);
    }
});

cancelEditBtn.addEventListener('click', resetForm);

function resetForm(){
    questionIdInput.value = '';
    questionInput.value = '';
    optionsInputs.forEach(input => input.value = '');
    correctAnswerSelect.innerHTML = '';
    cancelEditBtn.style.display = 'none';

    document.getElementById('form-title').textContent = 'Añadir nueva pregunta';
}


// Socket.io eventos

// Recibir pregunta
socket.on('question', (questionData)=>{
    currentQuestionId = questionData.id;
    questionText.textContent = questionData.question;
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option)=>{
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', ()=>{
            socket.emit('vote', option);
        });
        optionsContainer.appendChild(button);
    });
});

// Actualizar votos
socket.on('votes', (votesData)=>{
    const votesCount = new Map();

    votesData.forEach(([_, vote])=>{
        votesCount.set(vote, (votesCount.get(vote) || 0) + 1);
    });

    updateVotesDisplay(votesCount);
});

// Mostrar la respuesta
socket.on('show-answer', (correctAnswer)=>{
    const options = optionsContainer.getElementsByTagName('button');

    for(let option of options){
        if(option.textContent === correctAnswer){
            option.classList.add('correct');
        }
    }
});

// Funciones auxiliares
function updateVotesDisplay(votesCount){
    votesContainer.innerHTML = '';
    votesCount.forEach((count, option)=>{
        const voteElement = document.createElement('div');
        voteElement.textContent = `${option}: ${count} votos`;
        votesContainer.appendChild(voteElement);
    });
}

// Controles del profesor
showAnswerBtn.addEventListener('click', async ()=>{
    await fetch(BACKEND_URL + '/api/show-answer');
});

nextQuestionBtn.addEventListener('click', async ()=>{
    await fetch(BACKEND_URL + '/api/next-question');
});