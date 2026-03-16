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

    update(player, level) { // Agora recebe o Level atual
        let visualSpeed = player.speed * 0.05; 
        
        this.offset += visualSpeed;
        if (this.offset > 60) this.offset -= 60; 

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(level);
            // Quanto maior o level, mais rápido novos carros aparecem
            this.spawnTimer = Math.max(15, 100 - (player.speed * 0.2) - (level * 3));
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

        // CORREÇÃO: O carro é apagado assim que a ponta traseira dele (y < canvas.height + 60) passa do limite visual inferior da tela.
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 60 && e.y > -200);
    }

    spawnEnemies(level) {
        const padding = 35;
        const minX = this.roadLeft + padding;
        const maxX = this.roadLeft + this.roadWidth - padding;
        const randomX = Math.random() * (maxX - minX) + minX;

        this.enemies.push({
            x: randomX,
            y: -150, 
            // Inimigos ficam progressivamente mais rápidos com o Level
            speed: 100 + Math.random() * (60 + (level * 8)) 
        });
    }
}
