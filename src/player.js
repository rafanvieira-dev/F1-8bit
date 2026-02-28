export class Player {

    constructor(track) {
        this.track = track;
        // Posição inicial no centro da pista
        this.x = track.roadLeft + (track.roadWidth / 2);
        this.y = 560; 
        
        // Física estilo Top Gear
        this.speed = 0;
        this.maxSpeed = 230; // km/h
        this.accel = 1.5;
        this.braking = 3.0;
        this.friction = 0.5;
        this.turnSpeed = 5.0;

        this.crashed = false;
    }

    update(input) {
        // 1. Aceleração e Frenagem
        if (input.up) {
            this.speed += this.accel;
        } else if (input.down) {
            this.speed -= this.braking;
        } else {
            // Atrito natural soltando o acelerador
            this.speed -= this.friction; 
        }

        // Limita a velocidade entre 0 e a Máxima
        if (this.speed < 0) this.speed = 0;
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

        // 2. Direção (Só consegue virar bem se tiver velocidade)
        let speedFactor = this.speed / this.maxSpeed; 
        
        if (input.left && this.speed > 0) {
            this.x -= this.turnSpeed * (speedFactor + 0.4); // +0.4 garante que vire mesmo devagar
        }
        if (input.right && this.speed > 0) {
            this.x += this.turnSpeed * (speedFactor + 0.4);
        }

        // 3. Limites da Pista (Bater na grama freia o carro)
        const leftEdge = this.track.roadLeft + 15;
        const rightEdge = this.track.roadLeft + this.track.roadWidth - 15;

        if (this.x < leftEdge) {
            this.x = leftEdge;
            this.speed -= this.friction * 2; 
        }
        if (this.x > rightEdge) {
            this.x = rightEdge;
            this.speed -= this.friction * 2; 
        }
        
        if (this.speed < 0) this.speed = 0;
    }
}
