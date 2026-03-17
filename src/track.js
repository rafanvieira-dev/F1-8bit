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
        if (this.offset >= this.canvas.height) {
            this.offset -= this.canvas.height; 
        }

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(player, level);
            this.spawnTimer = Math.max(20, 90 - (player.speed * 0.15) - (level * 1.2));
        }

        // ========================================================
        // SISTEMA ANTI-ENGAVETAMENTO ORIGINAL (Perfeito)
        // ========================================================
        for (let i = 0; i < this.enemies.length; i++) {
            let e1 = this.enemies[i];
            for (let j = 0; j < this.enemies.length; j++) {
                if (i === j) continue;
                let e2 = this.enemies[j];
                
                // Se estão exatamente na mesma faixa
                if (Math.abs(e1.x - e2.x) < 10) {
                    if (e1.y > e2.y && e1.y - e2.y < 150) {
                        if (e1.speed > e2.speed) {
                            e1.speed = e2.speed;
                        }
                    }
                }
            }
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 350 && e.y > -350);
    }

    spawnEnemies(player, level) {
        let attempts = 0;
        let safe = false;
        let spawnX = 0;

        let baseEnemySpeed = 100 + (level * 2.5);
        let enemySpeed = baseEnemySpeed + Math.random() * 50; 

        // Chance de um carro apressadinho te ultrapassar
        if (Math.random() < 0.15 + (level * 0.005)) {
            enemySpeed = 240 + (level * 1.5) + Math.random() * 30; 
        }

        let spawnY = (enemySpeed > player.speed) ? this.canvas.height + 250 : -250;

        while (attempts < 15 && !safe) {
            let lane = Math.floor(Math.random() * this.lanesCount);
            spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            safe = true;
            for (let e of this.enemies) {
                // Distância rigorosa para não nascer um em cima do outro
                if (Math.abs(e.x - spawnX) < 10) {
                    if (Math.abs(e.y - spawnY) < 300) {
                        safe = false;
                    }
                }
            }
            attempts++;
        }

        if (safe) {
            this.enemies.push({
                x: spawnX,
                y: spawnY, 
                speed: enemySpeed,
                spriteType: Math.random() > 0.5 ? 0 : 1 
            });
        }
    }
}
