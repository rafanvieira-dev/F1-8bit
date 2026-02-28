export class Track {

    constructor(canvas) {
        this.canvas = canvas;

        this.offset = 0;

        /* largura dinâmica da pista */
        this.roadWidth = canvas.width * 0.45;
        this.roadLeft = (canvas.width - this.roadWidth) / 2;

        /* Mantemos isso apenas para o renderer desenhar as faixas brancas no chão */
        this.lanesCount = 4;
        this.laneWidth = this.roadWidth / this.lanesCount;

        this.enemies = [];
        this.spawnTimer = 0;
    }

    update(player) {
        /* A pista se move na velocidade do jogador */
        let visualSpeed = player.speed * 0.05; // Fator para converter km/h em pixels
        
        this.offset += visualSpeed;
        if (this.offset > 60) this.offset -= 60;

        /* spawn de inimigos baseados na velocidade */
        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies();
            // Inimigos aparecem mais rápido se o player estiver em alta velocidade
            this.spawnTimer = Math.max(30, 100 - (player.speed * 0.2));
        }

        /* mover inimigos (velocidade relativa) + verificar colisão */
        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            
            // A posição do inimigo na tela depende da diferença entre a sua velocidade e a dele
            e.y += (visualSpeed - enemyVisualSpeed);

            /* colisão */
            if (
                player.x - 18 < e.x + 18 &&
                player.x + 18 > e.x - 18 &&
                player.y - 28 < e.y + 28 &&
                player.y + 28 > e.y - 28
            ) {
                player.crashed = true;
            }
        }

        /* remover inimigos que ficaram muito para trás ou sumiram na frente */
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 80 && e.y > -200);
    }

    spawnEnemies() {
        // Escolhe uma posição X aleatória dentro dos limites do asfalto
        const padding = 25;
        const minX = this.roadLeft + padding;
        const maxX = this.roadLeft + this.roadWidth - padding;
        const randomX = Math.random() * (maxX - minX) + minX;

        this.enemies.push({
            x: randomX,
            y: -80,
            speed: 100 + Math.random() * 60 // Inimigos correm entre 100 e 160 km/h
        });
    }
}
