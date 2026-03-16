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
        if (this.spawnTimer <= 0) {
            this.spawnEnemies(level);
            // DIFICULDADE: Timer diminui mais rápido (mínimo de 20ms)
            this.spawnTimer = Math.max(20, 100 - (level * 12) - (player.speed * 0.15));
        }

        for (const e of this.enemies) {
            // DIFICULDADE: Velocidade de queda base mais agressiva
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
        // DIFICULDADE: Aumenta a chance de virem 3 carros a partir do Nível 3
        let maxCars = 1 + Math.floor(Math.random() * (level / 2 + 1));
        if (maxCars > 3) maxCars = 3;

        let availableLanes = [0, 1, 2, 3];
        availableLanes.sort(() => Math.random() - 0.5); 
        let chosenLanes = availableLanes.slice(0, maxCars);

        // DIFICULDADE: Velocidade base de queda escala com 1.5x o nível
        let fallSpeed = 6 + (level * 1.5);

        let ySpread = 0;
        for (let lane of chosenLanes) {
            let spawnX = this.roadLeft + (this.laneWidth * lane) + (this.laneWidth / 2);
            // Reduzido espalhamento vertical para os carros virem mais próximos
            let randomY = -150 - ySpread - (Math.random() * 40);
            
            this.enemies.push({
                x: spawnX,
                y: randomY, 
                baseSpeed: fallSpeed, 
                spriteType: Math.random() > 0.5 ? 0 : 1 
            });
            ySpread += 90 + Math.random() * 50;
        }
    }
}
