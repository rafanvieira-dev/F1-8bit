export class Player {
    constructor(track) {
        this.track = track;
        this.x = track.roadLeft + (track.roadWidth / 2);
        
        // Limites de câmera para dar a sensação do carro indo e voltando
        this.yBottom = track.canvas.height - 120; 
        this.yTop = track.canvas.height / 2.2;    
        this.y = this.yBottom; 
        
        this.speed = 0;
        this.maxSpeed = 250; // Começa a 250 km/h
        this.accel = 1.5;
        this.braking = 3.0;
        this.friction = 0.5;
        this.turnSpeed = 5.0;
        this.crashed = false;
    }

    update(input, level) {
        // NOVO: A velocidade máxima sobe com o nível, até o limite de 350 km/h no nível 100
        this.maxSpeed = Math.min(350, 250 + level);

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
        
        if (input.left && this.speed > 0) {
            this.x -= this.turnSpeed * (speedFactor + 0.4); 
        }
        if (input.right && this.speed > 0) {
            this.x += this.turnSpeed * (speedFactor + 0.4);
        }

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

        // Efeito de câmera acelerando o carro pro meio da tela
        const targetY = this.yBottom - (speedFactor * (this.yBottom - this.yTop));
        this.y += (targetY - this.y) * 0.05;
    }
}
