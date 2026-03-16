export class Track {
    constructor(canvas) {
        this.canvas = canvas;
        this.offset = 0;
        this.roadWidth = canvas.width * 0.70;
        this.roadLeft = (canvas.width - this.roadWidth) / 2;
        this.lanesCount = 4;
        this.laneWidth = this.roadWidth / this.lanesCount;
        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(player, level) {
        let visualSpeed = player.speed * 0.05; 
        this.offset += visualSpeed;
        if (this.offset >= this.canvas.height) this.offset -= this.canvas.height; 

        this.spawnTimer--;
        let maxEnemies = Math.min(5, 1 + Math.floor(level / 2));

        if (this.spawnTimer <= 0 && this.enemies.length < maxEnemies) {
            this.spawnEnemies(player, level);
            this.spawnTimer = Math.max(30, 100 - (level * 8));
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            if (Math.abs(player.x - e.x) < 52 && Math.abs(player.y - e.y) < 90) {
                player.crashed = true;
            }
        }
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 350 && e.y > -350);
    }

    spawnEnemies(player, level) {
        let attempts = 0;
        let safe = false;
        let spawnX = 0;
        let baseSpeed = 120 + (level * 15);
        let enemySpeed = baseSpeed + Math.random() * 60;
        let spawnY = (enemySpeed > player.speed) ? this.canvas.height + 300 : -300;

        while (attempts < 12 && !safe) {
            let lane = Math.floor(Math.random() * this.lanesCount);
            spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            safe = true;
            for (let e of this.enemies) {
                if (Math.abs(e.x - spawnX) < 10 && Math.abs(e.y - spawnY) < 400) safe = false;
            }
            attempts++;
        }

        if (safe) {
            this.enemies.push({ x: spawnX, y: spawnY, speed: enemySpeed, spriteType: Math.random() > 0.5 ? 0 : 1 });
        }
    }
}
