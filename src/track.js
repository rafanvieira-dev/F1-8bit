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
            this.spawnEnemies(level);
            // Dificuldade Aumentada: O timer agora diminui mais drasticamente
            // Nível 1 começa em ~80, mas cai rapidamente para o mínimo de 30
            this.spawnTimer = Math.max(30, 100 - (level * 10) - (player.speed * 0.12));
        }

        for (const e of this.enemies) {
            // Dificuldade Aumentada: Inimigos descem mais rápido
            e.y += e.baseSpeed + visualSpeed;

            if (
                player.x - 26 < e.x + 26 &&
                player.x + 26 > e.x - 26 &&
                player.y - 46 < e.y + 46 &&
                player.y + 46 > e.y - 46
            ) {
                player.crashed = true;
            }
        }

        this.enemies = this.enemies.filter(e => e.y < this.canvas.height + 150);
    }

    spawnEnemies(level) {
        // Dificuldade Aumentada: Mais chances de virem 3 carros simultâneos a partir do nível 3
        let maxCars = 1 + Math.floor(Math.random() * (level / 2 + 1));
        if (maxCars > 3) maxCars = 3;

        let availableLanes = [0, 1, 2, 3];
        availableLanes.sort(() => Math.random() - 0.5); 
        let chosenLanes = availableLanes.slice(0, maxCars);

        // Dificuldade Aumentada: Velocidade base de queda subiu de 3 para 5 + nível
        let fallSpeed = 5 + (level * 1.2);

        let ySpread = 0;

        for (let lane of chosenLanes) {
            let spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            
            // Reduzi o espalhamento vertical para os carros ficarem mais próximos e perigosos
            let randomY = -150 - ySpread - (Math.random() * 50);
            
            this.enemies.push({
                x: spawnX,
                y: randomY, 
                baseSpeed: fallSpeed, 
                spriteType: Math.random() > 0.5 ? 0 : 1 
            });

            ySpread += 100 + Math.random() * 60;
        }
    }
}
