// Tipos de variables y constantes
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamaños de objetos
const GAME_SIZE = 400;
const PLAYER_SIZE = 20;
const ITEM_SIZE = 15;
const OBSTACLE_SIZE = 25;

// Variables del juego
let playerX = GAME_SIZE / 2;
let playerY = GAME_SIZE - PLAYER_SIZE;
let playerSpeed = 5; // Velocidad del jugador
let score = 0; // Puntuación
let lives = 3; // Vidas del jugador
let gameOver = false; // Señala si el juego finalizó

// Arrays para items y obstáculos
let items = [];
let obstacles = [];

// Objeto de tipo JSON para controlar las teclas presionadas
let keys = {
    left: false,
    right: false
}

// Función para generar número aleatorio
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para crear nuevo item
function createItem(){
    return {
        x: random(0, GAME_SIZE - ITEM_SIZE),
        y: -ITEM_SIZE,
        type: random(1,3)
    }
}

// Función para crear nuevo obstáculo
function createObstacle(){
    return {
        x: random(0, GAME_SIZE - OBSTACLE_SIZE),
        y: -OBSTACLE_SIZE
    }
}

// Event listeners para el control del jugador
document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'ArrowLeft': // Presiona la tecla izquierda
            keys.left = true;
            break;
        case 'ArrowRight': // Presiona la tecla derecha
            keys.right = true;
            break;
    }
});

document.addEventListener('keyup', (e)=>{
    switch(e.key){
        case 'ArrowLeft': // Se suelta la tecla izquierda
            keys.left = false;
            break;
        case 'ArrowRight': // Se suelta la tecla derecha
            keys.right = false;
            break;
    }
});

let puntuacion = 'Puntuación final: ' + score;

// Función principal del juego
function gameLoop(){
    if(gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Juego terminado!!', GAME_SIZE/2 - 100, GAME_SIZE/2);
        ctx.fillText(`Puntuación final: ${score}`, GAME_SIZE/2 - 100, GAME_SIZE/2 + 40);
        return;
    }

    // Limpiar el canvas
    ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);

    // Mover jugador
    if(keys.left && playerX > 0){
        playerX -= playerSpeed;
    }

    if(keys.right && playerX < GAME_SIZE - PLAYER_SIZE) playerX += playerSpeed;

    // Dibujar jugador
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, PLAYER_SIZE, PLAYER_SIZE);

    // Generar items aleatoriamente
    if(random(1, 60) === 1){
        items.push(createItem());
    }

    // Generar items aleatoriamente
    if(random(1, 60) === 1){
        obstacles.push(createObstacle());
    }

    // Actualizar y dibujar items
    for(let i = items.length - 1; i >= 0; i--){
        let item = items[i];
        item.y += 2;

        // Dibujar item según su tipo
        switch (item.type){
            case 1:
                ctx.fillStyle = 'gold';
                break;
            case 2:
                ctx.fillStyle = 'silver';
                break;
            case 3:
                ctx.fillStyle = 'bronze';
                break;
        }
        ctx.fillRect(item.x, item.y, ITEM_SIZE, ITEM_SIZE);

        // Verificar colisión con jugador
        if(
            playerX < item.x + ITEM_SIZE &&
            playerX + PLAYER_SIZE > item.x &&
            playerY < item.y + ITEM_SIZE &&
            playerY + PLAYER_SIZE > item.y
        ){
            // Aumentar puntuación según tipo de item
            if(item.type === 1){
                score += 3;
            } else if(item.type === 2){
                score += 2;
            }else{
                score += 1;
            }
            items.splice(i, 1); // Agrega o remueve elementos de una matriz (array)
            document.getElementById('score').textContent = score;
        }

        // Eliminar items fuera de pantalla
        if(item.y > GAME_SIZE){
            items.splice(i, 1);
        }
    }

    // Actualizar y dibujar obstáculos
    for(let i = obstacles.length - 1; i >= 0; i--){
        let obstacle = obstacles[i];
        obstacle.y += 3;

        ctx.fillStyle = 'red';

        ctx.fillRect(obstacle.x, obstacle.y, OBSTACLE_SIZE, OBSTACLE_SIZE);

        // Verificar colisión con jugador
        if(
            playerX < obstacle.x + OBSTACLE_SIZE &&
            playerX + PLAYER_SIZE > obstacle.x &&
            playerY < obstacle.y + OBSTACLE_SIZE &&
            playerY + PLAYER_SIZE > obstacle.y
        ){
            lives--;
            obstacles.splice(i, 1);
            document.getElementById('lives').textContent = lives;

            if(lives <= 0){
                gameOver = true;
            }
        }

        // Eliminar obstáculos fuera de la pantalla
        if(obstacle.y > GAME_SIZE){
            obstacles.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);

}

// Inicar el juego
gameLoop();