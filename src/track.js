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
        
        // MUDANÇA: Reset do fundo usando o tamanho total da tela da imagem
        if (this.offset >= this.canvas.height) {
            this.offset -= this.canvas.height; 
        }

        // Calcula a dificuldade a cada 5 levels (Tiers de dificuldade)
        let difficultyTier = Math.floor((level - 1) / 5);

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(player, difficultyTier);
            // Timer diminui conforme o Tier de dificuldade aumenta
            this.spawnTimer = Math.max(25, 90 - (player.speed * 0.15) - (difficultyTier * 5));
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

        // Limpeza dos inimigos muito longe da tela para evitar sobrecarga de memória e sumiço de sprites
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 350 && e.y > -350);
    }

    spawnEnemies(player, difficultyTier) {
        let attempts = 0;
        let safe = false;
        let spawnX = 0;

        // Velocidade base que aumenta a cada Tier de dificuldade
        let baseEnemySpeed = 100 + (difficultyTier * 15);
        let enemySpeed = baseEnemySpeed + Math.random() * 50; 

        // Chance de um inimigo extremamente rápido (Apressadinho) que te ultrapassa (chance aumenta com o Tier)
        if (Math.random() < 0.15 + (difficultyTier * 0.05)) {
            enemySpeed = 240 + Math.random() * 30; // Mais rápido que o Max Speed (230)
        }

        // Se o inimigo for mais rápido que você, ele nasce lá atrás para ultrapassar
        let spawnY = (enemySpeed > player.speed) ? this.canvas.height + 250 : -250;

        while (attempts < 15 && !safe) {
            let lane = Math.floor(Math.random() * this.lanesCount);
            spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            safe = true;
            for (let e of this.enemies) {
                // Checa a distância X para garantir que não caiam na mesma faixa muito próximos
                if (Math.abs(e.x - spawnX) < 10) {
                    if (spawnY === -250 && e.y < this.canvas.height / 2) safe = false;
                    if (spawnY > 0 && e.y > this.canvas.height / 2) safe = false;
                }
            }
            attempts++;
        }

        if (safe) {
            this.enemies.push({
                x: spawnX,
                y: spawnY, 
                speed: enemySpeed,
                spriteType: Math.random() > 0.5 ? 0 : 1 // Sorteia cor do sprite 50/50
            });
        }
    }
}
