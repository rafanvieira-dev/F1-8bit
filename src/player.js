export class Player {
    constructor(track) {
        this.track = track;
        this.x = track.roadLeft + (track.roadWidth / 2);
        
        // Limites de movimento no eixo Y
        this.yBottom = track.canvas.height - 120; // Posição quando está devagar/freado
        this.yTop = track.canvas.height / 2.2;    // Posição no meio da tela (velocidade máxima)
        this.y = this.yBottom; // Nasce lá embaixo
        
        this.speed = 0;
        this.maxSpeed = 230; 
        this.accel = 1.5;
        this.braking = 3.0;
        this.friction = 0.5;
        this.turnSpeed = 5.0;
        this.crashed = false;
    }

    update(input) {
        // 1. Aceleração
        if (input.up) {
            this.speed += this.accel;
        } else if (input.down) {
            this.speed -= this.braking;
        } else {
            this.speed -= this.friction; 
        }

        if (this.speed < 0) this.speed = 0;
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

        let speedFactor = this.speed / this.maxSpeed; 
        
        // 2. Movimento Lateral (X)
        if (input.left && this.speed > 0) {
            this.x -= this.turnSpeed * (speedFactor + 0.4); 
        }
        if (input.right && this.speed > 0) {
            this.x += this.turnSpeed * (speedFactor + 0.4);
        }

        // Limites da grama
        const leftEdge = this.track.roadLeft + 30;
        const rightEdge = this.track.roadLeft + this.track.roadWidth - 30;

        if (this.x < leftEdge) {
            this.x = leftEdge;
            this.speed -= this.friction * 2; 
        }
        if (this.x > rightEdge) {
            this.x = rightEdge;
            this.speed -= this.friction * 2; 
        }
        
        if (this.speed < 0) this.speed = 0;

        // 3. EFEITO DE CÂMERA (Movimento no eixo Y)
        // Descobre onde o carro deveria estar com base na velocidade atual
        const targetY = this.yBottom - (speedFactor * (this.yBottom - this.yTop));
        
        // Move o carro suavemente até essa posição alvo (interpolação)
        this.y += (targetY - this.y) * 0.05;
    }
}
