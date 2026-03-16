export class Track {

    constructor(canvas) {
        this.canvas = canvas;
        this.offset = 0;
        this.roadWidth = canvas.width * 0.45;
        this.roadLeft = (canvas.width - this.roadWidth) / 2;
        this.lanesCount = 4;
        this.laneWidth = this.roadWidth / this.lanesCount;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(player) {
        let visualSpeed = player.speed * 0.05; 
        
        this.offset += visualSpeed;
        if (this.offset > 60) this.offset -= 60; // Loop curto para a pista desenhada

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies();
            this.spawnTimer = Math.max(30, 100 - (player.speed * 0.2));
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            if (
                player.x - 18 < e.x + 18 &&
                player.x + 18 > e.x - 18 &&
                player.y - 28 < e.y + 28 &&
                player.y + 28 > e.y - 28
            ) {
                player.crashed = true;
            }
        }

        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 80 && e.y > -200);
    }

    spawnEnemies() {
        const padding = 25;
        const minX = this.roadLeft + padding;
        const maxX = this.roadLeft + this.roadWidth - padding;
        const randomX = Math.random() * (maxX - minX) + minX;

        this.enemies.push({
            x: randomX,
            y: -80,
            speed: 100 + Math.random() * 60 
        });
    }
}
