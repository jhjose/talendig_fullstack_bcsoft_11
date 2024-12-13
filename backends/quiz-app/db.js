// Requerir el paquete de MYSQL
const mysql = require('mysql');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost', // 0.0.0.0   127.0.0.1
    user: 'root',
    password: '',
    database: 'quiz_app'
});

// Conectar a la base de datos
connection.connect((err)=>{
    if(err){
        console.error('Error conectando a MySQL:', err);
        return;
    }

    console.log('Conectado a MySQL correctamente');
});

// Crear tabla si no existe
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        options JSON NOT NULL,
        correct_answer VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

connection.query(createTableQuery, (err)=>{
    if(err){
        console.error('Error creando tabla:', err);
        return;
    }
    console.log('Tabla de preguntas creada o verificada');

    // Insertar preguntas de ejemplo si la tabla está vacía
    connection.query('SELECT COUNT(*) AS count FROM questions', (err, results)=>{
        if(err){
            console.error('Error verificando preguntas:', err);
            return;
        }

        if(results[0].count === 0){
            const sampleQuestions = [
                {
                    question: '¿Qué método de array crea un nuevo array con los resultados de aplicar una función a cada elemento?',
                    options: JSON.stringify(["map()", "filter()", "reduce()", "forEach()"]),
                    correct_answer: "map()"
                },
                {
                    question: '¿Cuál es la forma correcta de declarar una variable que no puede ser reasignada?',
                    options: JSON.stringify(["var x = 5", "let x = 5", "const x = 5", "static x = 5"]),
                    correct_answer: "const x = 5"
                },
            ];

            sampleQuestions.forEach(q => {
                connection.query('INSERT INTO questions SET ?', q, (err)=>{
                    if(err) console.error('Error insertando pregunta:', err);

                    console.log(q.correct_answer);

                });
            });
        }
    });
});

// Funciones para interactuar con la base de datos
const dbOperations = {
    getAllQuestions: ()=>{
        return new Promise((resolve, reject)=>{
            connection.query('SELECT * FROM questions', (err, results)=>{
                if(err) reject(err);

                // Parsear las opciones de JSON a Array
                const questions = results.map(q => ({
                    ...q,
                    options: JSON.parse(q.options)
                }));
                resolve(questions);
            });
        });
    },
    addQuestion: (question, options, correctAnswer)=>{
        return new Promise((resolve, reject)=>{
            const questionData = {
                question,
                options: JSON.stringify(options),
                correct_answer: correctAnswer
            };

            connection.query('INSERT INTO questions SET ?', questionData, (err, result)=>{
                if(err) reject(err);
                resolve(result);
            })
        });
    },
    updateQuestion: (id, question, options, correctAnswer)=>{
        return new Promise((resolve, reject)=>{
            const questionData = {
                question,
                options: JSON.stringify(options),
                correct_answer: correctAnswer
            };

            connection.query('UPDATE questions SET ? WHERE id = ?', [questionData, id], (err, result)=>{
                if(err) reject(err);
                resolve(result);
            });
        });
    },
    deleteQuestion: (id) => {
        return new Promise((resolve, reject)=>{
            connection.query('DELETE FROM questions WHERE id = ?', [id], (err, result)=>{
                if(err) reject(err);
                resolve(result);
            })
        })
    },
};

module.exports = dbOperations;