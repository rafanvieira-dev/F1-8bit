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
            this.spawnEnemies(player, level); // Passamos o player para o inimigo saber a velocidade
            // Ritmo de spawn de carros mais constante
            this.spawnTimer = Math.max(20, 80 - (level * 3));
        }

        for (const e of this.enemies) {
            let enemyVisualSpeed = e.speed * 0.05;
            
            // O carro inimigo sobe ou desce dependendo de quem é mais rápido
            e.y += (visualSpeed - enemyVisualSpeed);

            // Hitbox
            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        // CORREÇÃO: Limites aumentados para 250 pixels fora da tela para carros que vêm de trás não serem deletados!
        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 250 && e.y > -250);
    }

    spawnEnemies(player, level) {
        let attempts = 0;
        let safe = false;
        let spawnX = 0;
        
        // Define a velocidade do inimigo (Aumenta com o level, máxima de 210)
        let enemySpeed = Math.min(210, 100 + (level * 5) + Math.random() * 30);
        
        // A MÁGICA DA VELOCIDADE:
        // Se o inimigo é mais rápido que você, ele nasce ATRÁS (canvas.height + 200) para te ultrapassar.
        // Se é mais lento, nasce na FRENTE (-200) para você ultrapassar.
        let spawnY = (enemySpeed > player.speed) ? this.canvas.height + 200 : -200;

        // Tenta achar uma faixa vazia
        while (attempts < 10 && !safe) {
            let lane = Math.floor(Math.random() * this.lanesCount);
            spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            safe = true;
            for (let e of this.enemies) {
                if (Math.abs(e.x - spawnX) < 10) {
                    // Se o inimigo vai nascer na frente, garante que a pista não tá entupida lá na frente
                    if (spawnY === -200 && e.y < this.canvas.height / 2) safe = false;
                    // Se o inimigo vai nascer atrás, garante que a pista não tá entupida lá atrás
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
                // CORREÇÃO DAS CORES: Sorteio real de 50/50 em vez de usar a posição X
                spriteType: Math.random() > 0.5 ? 0 : 1 
            });
        }
    }
}
