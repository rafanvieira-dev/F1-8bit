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
        if (this.offset > 60) this.offset -= 60; 

        this.spawnTimer--;
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(level);
            // Timer um pouco mais longo para garantir distância segura entre os carros
            this.spawnTimer = Math.max(30, 100 - (player.speed * 0.15) - (level * 2));
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            e.y += (visualSpeed - enemyVisualSpeed);

            // Colisão
            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 60 && e.y > -200);
    }

    spawnEnemies(level) {
        let attempts = 0;
        let safe = false;
        let spawnX = 0;

        // Tenta 10 vezes achar uma faixa completamente livre
        while (attempts < 10 && !safe) {
            let lane = Math.floor(Math.random() * this.lanesCount);
            
            // Calcula o centro exato da faixa escolhida
            spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            safe = true;
            for (let e of this.enemies) {
                // Se já tem um carro nessa mesma faixa que ainda não desceu 350 pixels, a faixa não é segura!
                if (Math.abs(e.x - spawnX) < 10 && e.y < 350) {
                    safe = false;
                    break;
                }
            }
            attempts++;
        }

        // Se achou uma faixa vazia com segurança, cria o carro
        if (safe) {
            this.enemies.push({
                x: spawnX,
                y: -150, 
                // Todos os inimigos andam exatamente na mesma velocidade
                speed: 130 + (level * 5) 
            });
        }
    }
}
