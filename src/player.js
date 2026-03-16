export class Player {
    constructor(track) {
        this.track = track;
        this.x = track.roadLeft + (track.roadWidth / 2);
        this.y = 560; 
        
        this.speed = 0;
        this.maxSpeed = 230; 
        this.accel = 1.5;
        this.braking = 3.0;
        this.friction = 0.5;
        this.turnSpeed = 5.0;
        this.crashed = false;
    }

    update(input) {
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
    }
}
