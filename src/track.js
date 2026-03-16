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

        let difficultyTier = Math.floor((level - 1) / 5);

        // ========================================================
        // NOVO: SÓ GERA UM INIMIGO SE A PISTA ESTIVER VAZIA
        // ========================================================
        if (this.enemies.length === 0) {
            this.spawnTimer--;
            if (this.spawnTimer <= 0) {
                this.spawnEnemies(player, difficultyTier);
                // Temporizador mais curto para o jogo não ficar parado muito tempo
                this.spawnTimer = Math.max(10, 40 - (difficultyTier * 2)); 
            }
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            // Colisão com o jogador
            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        // Remove o inimigo quando ele sai bem de fora do ecrã
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 350 && e.y > -350);
    }

    spawnEnemies(player, difficultyTier) {
        // Como só há um inimigo, não precisamos de testar as faixas! Basta escolher uma ao acaso.
        let lane = Math.floor(Math.random() * this.lanesCount);
        let spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);

        let baseEnemySpeed = 100 + (difficultyTier * 15);
        let enemySpeed = baseEnemySpeed + Math.random() * 50; 

        // Carro "Apressadinho" que vem de trás
        if (Math.random() < 0.20 + (difficultyTier * 0.05)) {
            enemySpeed = 240 + Math.random() * 30; 
        }

        // Nasce atrás se for mais rápido, ou à frente se for mais lento
        let spawnY = (enemySpeed > player.speed) ? this.canvas.height + 250 : -250;

        // Adiciona o único carro à pista
        this.enemies.push({
            x: spawnX,
            y: spawnY, 
            speed: enemySpeed,
            spriteType: Math.random() > 0.5 ? 0 : 1 // Sorteia cor verde ou azul
        });
    }
}
