// ==================================
// Configuración inicial del juego
// ==================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Objeto para controlar las teclas presionadas
const keys = {
    right: false,
    left: false,
    up: false,
    down: false,
    attack: false,
}

// Clase Jugador - Maneja la lógica del personaje principal
class Player {
    constructor(){
        // Posición inicial del jugador
        this.x = 50; // Cambiado para empezar más a la izquierda
        this.y = canvas.height - 100;

        // Dimenciones del jugador
        this.width = 40;
        this.height = 60;

        // Física del jugador - Ajustada para mejor jugabilidad
        this.speed = 6; // Aumentada velocidad horizontal
        this.jumpForce = -13; // Reducida fuerza de salto para mejor control
        this.gravity = 0.5; // Reducida gravedad
        this.velocityY = 0;
        this.velocityX = 0;
        this.maxJumps = 2; // Doble salto permitido
        this.jumpsLeft = this.maxJumps;

        // Estados del jugador
        this.isJumping = false;
        this.isAttacking = false;
        this.direction = 'right';

        // Animación
        this.attackTimer = 0;
        this.attackDuration = 20;
    }

    update(){
        // Movimiento horizontal
        this.velocityX = 0;

        if(keys.right){
            this.velocityX = this.speed;
            this.direction = 'right';
        }
        if(keys.left){
            this.velocityX = -this.speed;
            this.direction = 'left';
        }

        // Sistema de salto mejorado
        if(keys.up && this.jumpsLeft > 0){
            // Solo permitir nuevo salto si se soltó la tecla anteriormente
            if(!this.isJumping || this.jumpsLeft < this.maxJumps){
                this.velocityY = this.jumpForce;
                this.isJumping = true;
                this.jumpsLeft--;
                // Reiniciar la bandera de salto
                keys.up = false;
            }
        }

        // Aplicar gravedad
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        this.x += this.velocityX;

        // Colisión con el suelo
        if(this.y + this.height > canvas.height){
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
            this.jumpsLeft = this.maxJumps;
        }

        // Límites del canvas
        if(this.x < 0) this.x = 0;
        if(this.x + this.width > canvas.width) this.x = canvas.width - this.width;

        // Manejo del ataque
        if(keys.attack && !this.isAttacking){
            this.isAttacking = true;
            this.attackTimer = this.attackDuration;
        }

        if(this.isAttacking){
            this.attackTimer--;
            if(this.attackTimer <= 0){
                this.isAttacking = false;
            }
        }

    }

    draw(){
        // Dibujar sombra del jugador
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(this.x - 2, this.y - 2, this.width, this.height);

        // Color base del jugador
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Dibujar cara en la dirección correcta
        ctx.fillStyle = 'white';

        if(this.direction === 'right'){
            ctx.fillRect(this.x + this.width - 15, this.y + 10, 5, 5);
        }else {
            ctx.fillRect(this.x + 10, this.y + 10, 5, 5);
        }

        if(this.isAttacking){
            ctx.fillStyle = 'rgba(255,0,0,0.5)';

            if(this.direction === 'right'){
                ctx.fillRect(this.x + this.width, this.y, 40, this.height);
            }else{
                ctx.fillRect(this.x - 40, this.y, 40, this.height);
            }
        }
    }

}


// Clase Plataforma - Define las plataformas del juego
class Platform {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        // Sombra de la plataforma
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(this.x + 2, this.y + 2, this.width, this.height);

        // Plataforma
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Detalle superior de la plataforma
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(this.x, this.y, this.width, 5);
    }

    checkCollision(player){
        if(
            player.x + player.width > this.x &&
            player.x < this.x + this.width &&
            player.y + player.height > this.y &&
            player.y < this.y + this.height
        ){
            // Colisión desde arriba
            if(
                player.velocityY > 0 &&
                player.y + player.height - player.velocityY <= this.y
            ){
                player.y = this.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
                player.jumpsLeft = player.maxJumps; // Restaurar saltos al aterrizar encima de la plataforma
                return;
            }

            // Colisión lateral
            if(player.velocityY > 0){
                // Prevenir que el jugador se pegue a las paredes
                if(player.x + player.width > this.x && player.x < this.x){
                    player.x = this.x - player.width;
                }else if(player.x < this.x + this.width && player.x + player.width > this.x + this.width){
                    player.x = this.x + this.width;
                }
            }
        }
    }
}


// Clase Enemigo - Define los enemigos del juego
class Enemy {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
        this.direction = 1;
        this.health = 100;
    }

    update(){
        this.x += this.speed * this.direction;

        if(this.x + this.width > canvas.width || this.x < 0){
            this.direction *= -1;
        }
    }

    draw(){
        // Sombra del enemigo
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(this.x + 2, this.y + 2, this.width, this.health);

        // Enemigo
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Barra de vida
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y - 10, this.width, 5);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(this.x, this.y - 10, (this.width * this.height) / 100, 5);
    }

    checkHit(player){
        if(player.isAttacking){
            let attackBox = {
                x: player.direction === 'right' ? player.x + player.width : player.x - 40,
                y: player.y,
                width: 40,
                height: player.height
            };

            if(
                this.x < attackBox.x + attackBox.width &&
                this.x + this.width > attackBox.x &&
                this.y < attackBox.y + attackBox.height &&
                this.y + this.height > attackBox.y
            ){
                this.health -= 20;
                return true;
            }
        }
        return false;
    }

}

// Inicialización de objetos del juego
const player = new Player();

// Plataformas ajustadas para mejor jugabilidad
const platforms = [
    // Plataformas iniciales (escalera inicial)
    new Platform(50, 500, 100, 15),
    new Platform(200, 450, 100, 15),
    new Platform(350, 400, 100, 15),

    // Plataformas medias
    new Platform(150, 300, 150, 15),
    new Platform(400, 300, 150, 15),

    // Plataformas superiores
    new Platform(250, 200, 100, 15),
    new Platform(450, 200, 100, 15),

    // Plataformas laterales
    new Platform(50, 350, 80, 15),
    new Platform(670, 350, 80, 15),

    // Plataformas especiales
    new Platform(300, 150, 200, 15),
];

// Enemigos ajustados a las nuevas plataformas
const enemies = [
    new Enemy(300, 120),
    new Enemy(400, 270),
];

// Manejo de eventos del teclado
document.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'ArrowRight': keys.right = true; break;
        case 'ArrowLeft': keys.left = true; break;
        case 'ArrowUp':
            if(!keys.up){ // Solo activar si no estaba ya presionada
                keys.up = true;
            }
            break;
        case 'ArrowDown': keys.down = true; break;
        case ' ': keys.attack = true; break;
    }
});

document.addEventListener('keyup', (e)=>{
    switch(e.key){
        case 'ArrowRight': keys.right = false; break;
        case 'ArrowLeft': keys.left = false; break;
        case 'ArrowUp': keys.up = false; break;
        case 'ArrowDown': keys.down = false; break;
        case ' ': keys.attack = false; break;
    }
});

// Game Loop - El bucle principal del juego
function gameLoop(){
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar fondo con degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Cielo azul claro arriba
    gradient.addColorStop(1, '#4A90E2'); // Azul más ocuro abajo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar y dibujar plataformas
    platforms.forEach(platform => {
        platform.draw();
        platform.checkCollision(player);
    });

    // Actualizar y dibujar enemigos
    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw();

        if(enemy.checkHit(player)){
            if(enemy.health <= 0){
                enemies.splice(index, 1);
            }
        }
    });

    // Actualizar y dibujar jugador
    player.update();
    player.draw();

    // Mostrar controles en pantalla
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 200, 80);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText('Controles:', 20, 30);
    ctx.fillText('← → : Moverse', 20, 50);
    ctx.fillText('Espacio : Atacar', 20, 90);

    // Continuar el bucle
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();