export class Track {

    constructor(canvas) {
        this.canvas = canvas;
        this.offset = 0;
        
        // Pista alargada para 75% da largura da tela
        this.roadWidth = canvas.width * 0.75;
        this.roadLeft = (canvas.width - this.roadWidth) / 2;
        
        this.lanesCount = 4;
        this.laneWidth = this.roadWidth / this.lanesCount;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(player) {
        let visualSpeed = player.speed * 0.05; 
        
        this.offset += visualSpeed;
        if (this.offset > 60) this.offset -= 60; 

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies();
            this.spawnTimer = Math.max(30, 100 - (player.speed * 0.2));
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            // Colisão ampliada para o carro de 60x90 (Margem de segurança de ~25px na largura e ~40px na altura)
            if (
                player.x - 25 < e.x + 25 &&
                player.x + 25 > e.x - 25 &&
                player.y - 40 < e.y + 40 &&
                player.y + 40 > e.y - 40
            ) {
                player.crashed = true;
            }
        }

        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 80 && e.y > -200);
    }

    spawnEnemies() {
        // Margem maior (padding) para evitar que o carro maior nasça cortado na zebra
        const padding = 35;
        const minX = this.roadLeft + padding;
        const maxX = this.roadLeft + this.roadWidth - padding;
        const randomX = Math.random() * (maxX - minX) + minX;

        this.enemies.push({
            x: randomX,
            y: -100, // Nascem um pouco mais acima na tela
            speed: 100 + Math.random() * 60 
        });
    }
}
