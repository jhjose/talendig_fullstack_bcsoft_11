const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./db');

//const { questions } = require('./questions');

const app = express();
const server = http.createServer(app);

app.use(express.json());

// Configurar headers de seguridad
app.use((req, res, next) => {
    // Remover cualquier CSP existente
    res.removeHeader('Content-Security-Policy');
    
    // Configurar headers más permisivos
    res.setHeader(
        'Content-Security-Policy',
        "default-src * 'unsafe-eval' 'unsafe-inline'; " +
        "font-src * data: 'unsafe-inline'; " +
        "img-src * data: blob: 'unsafe-inline'; " +
        "script-src * 'unsafe-eval' 'unsafe-inline'; " +
        "style-src * 'unsafe-inline'; " +
        "connect-src * ws: wss:;"
    );
    next();
});

app.use(cors({
    origin: [
        'http://192.168.100.17:3070',
        'http://localhost:3070',
        'https://0cef6ff20d95.ngrok.app',
        // Permitir acceso desde cualquier IP en tu red local
        /^http:\/\/192\.168\.\d+\.\d+:\d+$/
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const io = new Server(server, {
    cors: {
        origin: [
            'http://192.168.100.17:3070',
            'http://localhost:3070',
            'https://0cef6ff20d95.ngrok.app',
            /^http:\/\/192\.168\.\d+\.\d+:\d+$/
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

// Almacena los votos de los estudiantes
const votes = new Map();

// Pregunta actual
let currentQuestionIndex = 0;
let showingAnswer = false;
let questions = []; // Almacenará las preguntas de la base de datos

// Cargar preguntas al inicio
async function loadQuestions(){
    try{
        questions = await db.getAllQuestions();
        console.log(`${questions.length} preguntas cargadas de la base de datos`);
    }catch(err){
        console.error('Error cargando preguntas: ', err);
    }
}

loadQuestions();

io.on('connection', (socket)=>{
    console.log('Usuario conectado...');

    // Evento cuando un estudiante se une
    socket.on('join', (studentName)=>{
        console.log(`${studentName} se ha unido`);

        socket.studentName = studentName;

        // Enviar la pregunta actual al estudiante
        socket.emit('question', {
            ...questions[currentQuestionIndex],
            showingAnswer: showingAnswer
        });

        // Enviar los votos actuales
        socket.emit('votes', Array.from(votes.entries()));
    });

    // Cuando un estudiante vota
    socket.on('vote', (answer)=>{
        if(!showingAnswer){
            votes.set(socket.studentName, answer);
            io.emit('votes', Array.from(votes.entries()));
        }
    });

});

app.get('/', (req, res)=>{
    
    res.json({success: true, message: 'Completado'});
});

// Añadir endpoints para gestionar preguntas
app.get('/api/questions', async(req, res)=>{
    try {
        const allQuestions = await db.getAllQuestions();

        res.json(allQuestions);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post('/api/questions', async(req, res)=>{
    console.log('req', req)
    try {
        
        const {question, options, correctAnswer} = req?.body;
        await db.addQuestion(question, options, correctAnswer);
        await loadQuestions(); // Recargar preguntas

        res.status(200).json({success: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.put('/api/questions/:id', async (req, res) => {
    try {
        const {question, options, correctAnswer} = req.body;
        await db.updateQuestion(req.params.id, question, options, correctAnswer);
        await loadQuestions();

        res.json({success: true})
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.delete('/api/questions/:id', async (req, res)=>{
    try {
        await db.deleteQuestion(req.params.id);
        await loadQuestions();

        res.json({success: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


// API para el profesor
app.get('/api/show-answer', (req, res)=>{
    showingAnswer = true;
    console.log('questions[currentQuestionIndex].correctAnswer', questions[currentQuestionIndex].correctAnswer)
    io.emit('show-answer', questions[currentQuestionIndex].correctAnswer);
    
    res.json({success: true});
});

app.get('/api/next-question', (req, res)=>{
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showingAnswer = false;

    votes.clear();

    io.emit('question', questions[currentQuestionIndex]);
    io.emit('votes', Array.from(votes.entries()));

    res.json({success: true});
});

const HOST = "0.0.0.0";
const PORT = 3080;

server.listen(PORT, HOST, ()=>{
    console.log(`Server running on http://${HOST}:${PORT}`);
});